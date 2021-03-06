define(['event_bus'], function (eventBus) {

    /**** 
    NEEDED @numRandomColor int  : Number of color you want to be sent
    NEEDED @r int : Value max of the Red color you want. Max is 255
    NEEDED @g int : Value max of the Green color you want. Max is 255
    NEEDED @b int : Value max of the Blue color you want. Max is 255
    OPTIONAL @a bolean : Allow alpha or not.
    WIKI : https://github.com/plancien/learning-engine/wiki/_preview
    ****/
    eventBus.on('number random color', function(numRandomColor,r,g,b,a){

        for(var i = 0; i < numRandomColor; i++)
        {
            if(a)
            {
                colorHexa = Math.floor(Math.random()*r) + ',' + Math.floor(Math.random()*g) + ',' + Math.floor(Math.random()*b + ',' + Math.random();
                colorRgb = 'RGBA('+colorHexa +');'
                eventBus.emit('random color', colorRgb);
            }
            else 
            {
                colorHexa = Math.floor(Math.random()*r) + ',' + Math.floor(Math.random()*g) + ',' + Math.floor(Math.random()*b);
                colorRgb = 'RGB('+colorHexa +');'
                eventBus.emit('random color', colorRgb);
            }

        }
    });
});



