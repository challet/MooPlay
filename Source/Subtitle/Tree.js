Video.SubTitle.Tree = new Class({
    
    nb_childs: 2,
    
    children: [],
    subs: [],
    
    initialize : function(start, end) {
        this.start = start;
        this.end = end;
    },

    getSubs: function(timestamp) {
        
        if(timestamp < this.start && timestamp >= this.end) {
            return [];
        }
        
        
        var subs = [];
        
        this.subs.each(function(sub) {
            if(timestamp >= this.start && timestamp < this.end) {
                subs.push(sub);
            }
        });
        
        this.getChildren(false).each(function(child) {
            subs.extend(child.getSubs(timestamp));
        });
        
        return subs;
    },

    addSub: function(sub) {
        
        var fit_in_one_child = false;
        this.getChildren(true).each(function(child) {
            if(child.doesSubtitleFit(sub)) {
                fit_in_one_child = true;
                child.addSub(sub);
            }
        }.bind(this));
        
        if(this.doesSubtitleFit(sub) && !fit_in_one_child) {
            this.subs.push(sub);
        }
    },

    getChildren: function(even_empty) {
        if(this.children.length == 0 && even_empty) {
            this.buildChildren();
        }
        return this.children;
    },            
    
    buildChildren: function() {
        
        var child_period = Math.ceil((this.end - this.start) / this.nb_childs); 
        
        for (var i = 0; i < this.nb_childs; i++) {
            this.children.push(new Video.SubTitle.Tree(
                this.start + i * child_period, // start
                this.start + (i + 1) * child_period// end
            ));
        }
    },
    
    doesSubtitleFit: function(sub) {
        return sub.start >= this.start && sub.end <= this.end;
    }

});
