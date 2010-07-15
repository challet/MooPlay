(function(context){
 
context.Sets = {
 
'master': [

    'Control/BaseButton/initialize',
    
    'Control/FastMove/initialize',
    'Control/FastMove/beginMove',
    'Control/FastMove/stopMove',
    'Control/FastMove/tick',
    
    'Control/FullScreen/specificInitialize', // todo
    'Control/FullScreen/toggleState', // todo
    
    'Control/LoadProgress/initialize', // todo
    'Control/LoadProgress/tick', // todo
    
    'Control/Mute/initialize',
    'Control/Mute/update',
    'Control/Mute/toggleState',
    
    'Control/PlayPause/initialize',
    'Control/PlayPause/toggleState',

    'Control/PlayProgress/initialize',
    'Control/PlayProgress/tick', // todo
    'Control/PlayProgress/change',
    
    'Control/TimeDisplay/initialize',
    'Control/TimeDisplay/update',

    'Control/Volume/initialize', // todo
    'Control/Volume/update', // todo
    'Control/Volume/change', // todo

    'Subtitle/Item/initialize',
    
    'Subtitle/Loader/initialize', // todo
    'Subtitle/Loader/load', // todo
    'Subtitle/Loader/run',
    'Subtitle/Loader/selectParser',
    
    'Subtitle/Parser/Base/initialize',
    'Subtitle/Parser/Base/hash',
    'Subtitle/Parser/SubRip/parse',
    'Subtitle/Parser/SubViewer/parse',
    
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