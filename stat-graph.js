var svg = d3.select("#typeChart > #graph").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var  players = svg.append("g").selectAll(".players"),
     skill = svg.append("g").selectAll(".skill"),
     hometown = svg.append("g").selectAll(".state"),
     node = svg.append("g").selectAll(".node");

d3.json("types.json", function(error, classes) {
    var nodes = cluster(d3.hierarchy(packageHierarchy(stats))).players;
    var players = typePlayers(nodes);
    var hometown = typeState(nodes);
    var skill = typeSkill(nodes);

    window.players = players
        .data(immunes.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "players")
        .attr("d", line);

    window.skill = skill
        .data(skill.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "skill")
        .attr("d", line);

    window.state = hometown
        .data(state.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "state")
        .attr("d", line)
        .attr("data-is-effective-against-self", function(d) {
            return (d[0] === d[d.length - 1]);
        });

    window.node = node
        .data(nodes.filter(function(n) {
            return !n.children;
        }))
        .enter().append("text")
        .attr("class", function(n) {
            return 'node ' + n.data.name.toLowerCase();
        })
        .attr("dx", function(d) {
            return d.x < 180 ? 8 : -8;
        })
        .attr("dy", ".31em")
        .attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + (d.x < 180 ? "" : "rotate(180)");
        })
        .style("text-anchor", function(d) {
            return d.x < 180 ? "start" : "end";
        })
        .text(function(d) {
            return d.data.key;
        })
        .on("click", activate);
});

function reset() {
    window.players
        .classed("is-a-star", false);

    window.skill
        .classed("strength", false);

    window.hometown
        .classed("is-from", false);

    window.node
        .classed("node--target", false)
        .classed("players-node", false)
        .classed("skill-node", false)
        .classed("hometown-node", false)
        .classed("node--active", false);

    window.dualType = {
        size: function() {
            var size = 0,
                key;
            for (key in this) {
                if (this.hasOwnProperty(key)) size++;
            }
            return size;
        }
    };
    window.dualTypeIdx = [];

    return false;
}

function activate(d) {


    if (window.dualType.size() > 2) {
        window.dualType = {
            size: function() {
                var size = 0,
                    key;
                for (key in this) {
                    if (this.hasOwnProperty(key)) size++;
                }
                return size;
            }
        };
        window.dualTypeIdx = [];
        window.node.each(function(n) {
            n.target = n.source = false;
        }).attr("class", function(n) {
            return 'node ' + n.data.name.toLowerCase();
        });
    }

    if (window.dualType[d.data.name] !== undefined) {
        delete window.dualType[d.data.name];
    }

    window.dualType[d.data.name] = d;
    window.dualTypeIdx.push(d);

   
    window.node
        .each(function(n) {
            n.target = n.source = false;
        });



    window.players
        .classed("is-a-star", function(l) {
            return window.colorPath(window.dualType, l, 'skill');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function(d) {
            this.parentNode.appendChild(this);
        });

    window.skill
        .classed("uneffective", function(l) {
            return window.colorPath(window.dualType, l, 'skill');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendPlayer(this);
        });

    window.hometown
        .classed("is-from", function(l) {
            return window.colorPath(window.dualType, l, 'weak');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendChild(this);
        });


    window.node
        .classed("node--active", function(target) {
            return (target === d) || this.classList.contains("node--active");
        })
        .classed("node--target", function(n) {
            return n.target;
        })
        .classed("players-node", function(target, l) {
            return (this.classList.contains('players-node') || target.data.players.indexOf(d.data.name) != -1);
        })
        .classed("skill-node", function(target) {
            return (this.classList.contains('skill-node') || target.data.skill.indexOf(d.data.name) != -1);
        })
        .classed("state-node", function(target) {
            return (target.data.state.indexOf(d.data.name) != -1);
        })
        
}

d3.select(self.frameElement).style("height", diameter + "px");

//construct the package hierarchy from class names.

function packageHierarchy(classes) {
    var map = {};

    function find(name, data) {
        var node = map[name],
            i;
        if (!node) {
            node = map[name] = data || {
                name: name,
                players: []
            };
            if (name.length) {
                node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                node.parent.player.push(node);
                node.key = name.substring(i + 1);
            }
        }
        return node;
    }
    classes.forEach(function(d) {
        find(d.name, d);
    });

    return map[""];
}
//Make the player links
function typePlayers(nodes) {
    var map = {},
        players = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.players) d.data.players.forEach(function(i) {
            players.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return players;
}
//Make the Skill links

function typeSkill(nodes) {
    var map = {},
        skill = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.skill) d.data.skill.forEach(function(i) {
            skill.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return skill;
}
//Make the hometown links
function typeHometown(nodes) {
    var map = {},
        state = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.states) d.data.states.forEach(function(i) {
            states.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return strengths;
}
reset();