var svg = d3.select("#typeChart > #graph").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var  PTS = svg.append("g").selectAll(".PTS"),
     AST = svg.append("g").selectAll(".AST"),
     STL = svg.append("g").selectAll(".STL"),
     BLK = svg.append("g").selectAll(".BLK"),
     TRB = svg.append("g").selectAll(".TRB"),
     TOV = svg.append("g").selectAll(".TOV"),
     node = svg.append("g").selectAll(".node");

d3.csv("usa_ballers.csv", function(error, classes) {
    var nodes = cluster(d3.hierarchy(packageHierarchy(stats))).Name;
    var PTS = typePTS(nodes);
    var AST = typeAST(nodes);
    var STL = typeSTL(nodes);
    var BLK = typeBLK(nodes);
    var TRB = typeTRB(nodes);
    var TOV = typeTOV(nodes);

    window.PTS = PTS
        .data(PTS.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "PTS")
        .attr("d", line);

    window.AST = AST
        .data(AST.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "AST")
        .attr("d", line);

    window.STL = STL
        .data(STL.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "STL")
        .attr("d", line)
        
    window.BLK = BLK
        .data(BLK.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "BLK")
        .attr("d", line);    

    window.TRB = TRB
        .data(TRB.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "TRB")
        .attr("d", line);    

    window.TOV = TOV
        .data(AST.map(function(node){
            return node.source.path(node.target);
        }))
        .enter().append("path")
        .each(function(d) {
            d.source = d[0], d.target = d[d.length - 1];
        })
        .attr("class", "TOV")
        .attr("d", line)   
        .attr("data-is-effective-against-self", function(d) {
            return (d[0] === d[d.length - 1]);
        });

    window.node = node
        .data(nodes.filter(function(n) {
            return !n.Name;
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
    window.PTS
        .classed("is-a-scorer", false);

    window.AST
        .classed("passer", false);

    window.STL
        .classed("defender", false);

    window.BLK
        .classed("defender", false);

    window.TRB
        .classed("work-horse", false);

    window.TOV
        .classed("sloppy", false); 


    window.node
        .classed("node--target", false)
        .classed("PTS-node", false)
        .classed("AST-node", false)
        .classed("STL-node", false)
        .classed("BLK-node", false)
        .classed("TRB-node", false)
        .classed("TOV-node", false)

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



    window.PTS
        .classed("is-a-scorer", function(l) {
            return window.colorPath(window.dualType, l, 'sloppy');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function(d) {
            this.parentNode.appendPTS(this);
        });

    window.AST
        .classed("uneffective", function(l) {
            return window.colorPath(window.dualType, l, 'sloppy');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendPTS(this);
        });

    window.STL
        .classed("defender", function(l) {
            return window.colorPath(window.dualType, l, 'sloppy');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendPTS(this);
        });

    window.BLK
        .classed("defender", function(l) {
            return window.colorPath(window.dualType, l, 'sloppy');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendPTS(this);
        });    

    window.TRB
        .classed("work-horse", function(l) {
            return window.colorPath(window.dualType, l, 'sloppy');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendPTS(this);
        });

    window.TOV
        .classed("sloppy", function(l) {
            return window.colorPath(window.dualType, l, 'sloppy');
        })
        .filter(function(l) {
            return l.target === d;
        })
        .each(function() {
            this.parentNode.appendPTS(this);
        });
    
    
        window.node
        .classed("node--active", function(target) {
            return (target === d) || this.classList.contains("node--active");
        })
        .classed("node--target", function(n) {
            return n.target;
        })
        .classed("PTS-node", function(target, l) {
            return (this.classList.contains('PTS-node') || target.data.PTS.indexOf(d.data.name) != -1);
        })
        .classed("AST-node", function(target) {
            return (this.classList.contains('AST-node') || target.data.AST.indexOf(d.data.name) != -1);
        })
        
        .classed("STL-node", function(target) {
            return (this.classList.contains('STL-node') || target.data.STL.indexOf(d.data.name) != -1);
        })
        
        .classed("BLK-node", function(target) {
            return (this.classList.contains('BLK-node') || target.data.STL.indexOf(d.data.name) != -1);
        })
        .classed("TOV-node", function(target) {
            return (target.data.State.indexOf(d.data.name) != -1);
        })
        
}

d3.select(self.frameElement).style("height", diameter + "px");

//construct the package hierarchy from player position.

function packageHierarchy(Pos) {
    var map = {};

    function find(name, data) {
        var node = map[name],
            i;
        if (!node) {
            node = map[name] = data || {
                name: name,
                Pos: []
            };
            if (name.length) {
                node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                node.parent.Pos.push(node);
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
//Make the points links
function typePTS(nodes) {
    var map = {},
        PTS = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.PTS) d.data.PTS.forEach(function(i) {
            PTS.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return PTS;
}
//Make the assists links

function typeAST(nodes) {
    var map = {},
        AST = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.AST) d.data.AST.forEach(function(i) {
            AST.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return AST;
}
//Make the steals links
function typeSTL(nodes) {
    var map = {},
        STL = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.STL) d.data.STL.forEach(function(i) {
            STL.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return STL;
}
    //Block links
function typeBLK(nodes) {
        var map = {},
            BLK = [];
    
        nodes.forEach(function(d) {
            map[d.data.name] = d;
        });
    
        nodes.forEach(function(d) {
            if (d.data.BLK) d.data.BLK.forEach(function(i) {
                BLK.push({
                    source: map[d.data.name],
                    target: map[i]
                });
            });
        });    
   
    return BLK;
}

function typeTRB(nodes) {
    var map = {},
        TRB = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.TRB) d.data.TRB.forEach(function(i) {
            TRB.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return TRB;
}

function typeTOV(nodes) {
    var map = {},
        TOV = [];

    nodes.forEach(function(d) {
        map[d.data.name] = d;
    });

    nodes.forEach(function(d) {
        if (d.data.TOV) d.data.TOV.forEach(function(i) {
            TOV.push({
                source: map[d.data.name],
                target: map[i]
            });
        });
    });

    return TOV;
}
reset();