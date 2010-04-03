(function(context){
 
context.Sets = {
 
'master': [

    'Control/BaseButton/initialize',
    
    'Control/FastMove/initialize',
    'Control/FastMove/beginMove',
    'Control/FastMove/stopMove',
    'Control/FastMove/tick',
    
    'Control/LoadProgress/initialize', //todo
    'Control/LoadProgress/tick', //todo
    
    'Control/PlayPause/initialize',
    'Control/PlayPause/toggleState',

    'Control/PlayProgress/initialize',
    'Control/PlayProgress/suspend', //todo
    'Control/PlayProgress/resume', //todo
    'Control/PlayProgress/tick', //todo
    'Control/PlayProgress/change',
    
    'Subtitle/Item/initialize',
    
    'Subtitle/Parser/Base/run',
    'Subtitle/Parser/Base/hash',
    'Subtitle/Parser/SubRip/parse',
    
    'Subtitle/Player/initialize',
    'Subtitle/Player/tick',
    
    'Subtitle/Tree/initialize',
    'Subtitle/Tree/buildChildren',
    'Subtitle/Tree/getChildren',
    'Subtitle/Tree/doesSubtitleFit',
    'Subtitle/Tree/addSub',
    'Subtitle/Tree/getSubs'

],

 
};
 
})(this.exports || this);