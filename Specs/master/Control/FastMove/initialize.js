(function() {
    
    var initial_prototype = {};
    var fake_event = {preventDefault: $empty};

    var element = null;
    var video = null;
    var begin_move_called = false;
    var stop_move_called = false;

    describe('Control.FastMove.initialize function', {
        
        before_all: function() {
            initial_prototype = {
                beginMove: MooPlay.Control.FastMove.prototype.beginMove,
                stopMove: MooPlay.Control.FastMove.prototype.stopMove
            };
        },
        
        after_all: function() {
            MooPlay.Control.FastMove.prototype.beginMove = initial_prototype.beginMove;
            MooPlay.Control.FastMove.prototype.stopMove = initial_prototype.stopMove;
        },
        
        
        before_each: function() {
            
            element = new Element('a', {
                id: 'playpause',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            video = new Element('video', {
                id: 'video',
                styles: {
                    width: 50,
                    height: 50
                }
            }).inject(document.body);
            
            MooPlay.Control.FastMove.prototype.beginMove = function() {
                begin_move_called = true;
            }
            
            MooPlay.Control.FastMove.prototype.stopMove = function() {
                stop_move_called = true;
            };
            
        },
        
        after_each: function() {
            
            element.dispose();
            video.dispose();
            
            element = null;
            video = null;
            begin_move_called = false;
            stop_move_called = false;
            
        },
                
        "should begin move on element 'mousedown' event": function() {
            new MooPlay.Control.FastMove(element, video);
            element.fireEvent('mousedown', fake_event);
            value_of(begin_move_called).should_be_true();
        },
        
        "should stop move on element 'mouseup' event": function() {
            new MooPlay.Control.FastMove(element, video);
            element.fireEvent('mouseup', fake_event);
            value_of(stop_move_called).should_be_true();
        },
        
        "should stop move on element 'mouseleave' event": function() {
            new MooPlay.Control.FastMove(element, video);
            element.fireEvent('mouseleave', fake_event);
            value_of(stop_move_called).should_be_true();
        }
        
    });
    
})();