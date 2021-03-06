define(['event_bus'], function (eventBus) {

    var score = 0;
    var scoreContainer;
    
    eventBus.on('init', function (mainContainer) {
        scoreContainer = $('<div id="score"></div>');
        mainContainer.append(scoreContainer);
    });
    
    eventBus.on('add points', function (points) {
        score += points;
        scoreContainer.html(score);
    });
    
});
