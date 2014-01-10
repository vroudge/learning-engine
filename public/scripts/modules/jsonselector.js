define(['event_bus'], function (eventBus) { //OBLIGATOIRE

    JSONSelector.prototype.jsonSelectData = function(params){

        var jayson = params.jayson;
        var preSelectionOfFields = params.preSelectionOfFields;
        var expectedNumberOfLevels = params.expectedNumberOfLevels;

        var levelKeys = [];
        var levelObject = [];
        var levelCounter=0;

          for(i in jayson) { 

            var fieldCount = 0;

            levelCounter++;
            levelKeys.push(i);

            var fullLevelCount = levelKeys.length;
            var levelContent = jayson[i];

            for (j in levelContent) { 

                var currentFieldValue = levelContent[j];
                fieldCount+=1;

                if(levelContent.toGet[fieldCount-2] === true && preSelectionOfFields){
                  levelObject.push(currentFieldValue);
                }   

            }

            if(levelCounter===expectedNumberOfLevels){
                return levelObject;
            }

        }  
        
        return levelObject;  
    }

    return new JSONSelector();
}); 