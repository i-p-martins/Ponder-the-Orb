let knowledge = Number(localStorage.getItem('knowledge'));
let arcana = Number(localStorage.getItem('arcana'));
let shards = Number(localStorage.getItem('shards'));
let buyMulti = 1;
let harder = Number(localStorage.getItem('harder'));
let smarter = Number(localStorage.getItem('smarter'));
let faster = Number(localStorage.getItem('faster'));
let longer = Number(localStorage.getItem('longer'));

$(document).ready(function(){
    let knowledge = Number(localStorage.getItem('knowledge'));
    $("#glow").height(knowledge*10 + "%")

    let arcana = Number(localStorage.getItem('arcana'));
    $("#arcanaNum").html(nFormatter(arcana, 1));
    
    let shards = Number(localStorage.getItem('shards'));
    if(shards >= 1){
        $("#shardStat").css("display", "block");
        $("#shardStat").html(nFormatter(shards, 1) + " Shards")
    }

    let buyMulti = 1;

    let harder = Number(localStorage.getItem('harder'));
    if (harder <= 0) {
        harder = 1;
        localStorage.setItem('harder', harder);
    }
    $("#harderCost").html("-" + nFormatter(calculateTotalCost(10, harder-1, buyMulti), 1) + " Arcana");
    $("#harderStat").html(nFormatter(harder, 1) + " Knowledge/Click");

    let smarter = Number(localStorage.getItem('smarter'));
    $("#smarterCost").html("-" + nFormatter(calculateTotalCost(25, smarter, buyMulti), 1) + " Arcana");
    $("#smarterStat").html(nFormatter(smarter,1) + " Knowledge/Sec");

    let faster = Number(localStorage.getItem('faster'));
    if (faster <= 0){
        faster = 1;
        localStorage.setItem('faster', faster);
    }
    $("#fasterCost").html("-" + nFormatter(calculateTotalCost(50, faster-1, buyMulti), 1) + " Arcana");
    $("#fasterStat").html("x" + nFormatter(faster, 1) + " Magic Bonus");

    let longer = Number(localStorage.getItem('longer'));
    if (longer < 10){
        longer = 10;
        localStorage.setItem('longer', longer);
    }
    $("#longerCost").html("-" + nFormatter(calculateTotalCost(100, (longer/10)-1, buyMulti), 1) + " Arcana");
    $("#longerStat").html(nFormatter(longer,1) + " Max Knowledge");

    $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)),1);

    $("#ponderHarder").click(function(){
        if (arcana >= calculateTotalCost(10, harder-1, buyMulti)){
            arcana -= calculateTotalCost(10, harder-1, buyMulti);
            localStorage.setItem('arcana', arcana);
            $("#arcanaNum").html(nFormatter(arcana,1));

            harder += 1*buyMulti;
            localStorage.setItem('harder', harder);

            $("#harderCost").html("-" + nFormatter(calculateTotalCost(10, harder-1, buyMulti), 1) + " Arcana");
            $("#harderStat").html(nFormatter(harder, 1) + " Knowledge/Click");
        }
    });

    $("#ponderFaster").click(function(){
        if (arcana >= calculateTotalCost(50, faster-1, buyMulti)){
            arcana -= calculateTotalCost(50, faster-1, buyMulti);
            localStorage.setItem('arcana', arcana);
            $("#arcanaNum").html(nFormatter(arcana,1));

            faster += 1*buyMulti;
            localStorage.setItem('faster', faster);

            $("#fasterCost").html("-" + nFormatter(calculateTotalCost(50, faster-1, buyMulti), 1) + " Arcana");
            $("#fasterStat").html("x" + nFormatter(faster,1) + " Magic Bonus");
            $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)*(shards+1)),1);
        }
    });

    $("#ponderSmarter").click(function(){
        if (arcana >= calculateTotalCost(25, smarter, buyMulti)){
            arcana -= calculateTotalCost(25, smarter, buyMulti);
            localStorage.setItem('arcana', nFormatter(arcana,1));
            $("#arcanaNum").html(nFormatter(arcana,1));

            smarter += 1*buyMulti;
            localStorage.setItem('smarter', smarter);

            $("#smarterCost").html("-" + nFormatter(calculateTotalCost(25, smarter, buyMulti), 1) + " Arcana");
            $("#smarterStat").html(nFormatter(smarter,1) + " Knowledge/Sec");
        }
    });

    $("#ponderLonger").click(function(){
        if (arcana >= calculateTotalCost(100, (longer/10)-1, buyMulti)){
            arcana -= calculateTotalCost(100, (longer/10)-1, buyMulti);
            localStorage.setItem('arcana', arcana);
            $("#arcanaNum").html(nFormatter(arcana,1));

            longer += 10*buyMulti;
            localStorage.setItem('longer', longer);

            $("#longerCost").html("-" + nFormatter(calculateTotalCost(100, (longer/10)-1, buyMulti), 1) + " Arcana");
            $("#longerStat").html(nFormatter(longer,1) + " Max Knowledge");
            $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)*(shards+1)),1);
        }
    });

    $("#shatter").click(function(){
        if (arcana>= 10000){
            shards += arcana/10000;
            localStorage.setItem('shards', shards);
            $("#shardStat").css("display", "block");
            $("#shardStat").html(nFormatter(shards,1) + " Shards")
            reset();
        }
    });

    $("#reset").click(function(){
        shards = 0;
        reset();
        localStorage.setItem('shards', 0);
        $("#shardStat").html(nFormatter(shards, 1) + " Shards")
    });

    $("#one").click(function(){
        buyMulti = 1;
        buyUpdate("one")
    });

    $("#ten").click(function(){
        buyMulti = 10;
        buyUpdate("ten")
    });

    $("#hundred").click(function(){
        buyMulti = 100;
        buyUpdate("hundred")
    });

    function buyUpdate(button){
        $("#harderCost").html("-" + nFormatter(calculateTotalCost(10, harder-1, buyMulti), 2) + " Arcana");
        $("#fasterCost").html("-" + nFormatter(calculateTotalCost(50, faster-1, buyMulti), 2) + " Arcana");
        $("#smarterCost").html("-" + nFormatter(calculateTotalCost(25, smarter, buyMulti), 2) + " Arcana");
        $("#longerCost").html("-" + nFormatter(calculateTotalCost(100, (longer/10)-1, buyMulti), 1) + " Arcana");

        $("#harderNum").html("+" + buyMulti + " Knowledge/Click<br>");
        $("#fasterNum").html("+" + buyMulti + " Magic Bonus<br>");
        $("#smarterNum").html("+" + buyMulti + " Knowledge/Sec<br>");
        $("#longerNum").html("+" + nFormatter(buyMulti*10, 1) + " Max Knowledge<br>");

        $("#one").prop('disabled', false)
        $("#ten").prop('disabled', false)
        $("#hundred").prop('disabled', false)
        $("#"+button).prop('disabled', true)
    }

    function reset(){
        localStorage.clear()
        localStorage.setItem('shards', shards);

        arcana = 0;
        $("#arcanaNum").html(nFormatter(arcana,1));

        knowledge = 0;
        $("#glow").height(knowledge*10 + "%")

        harder = 1;
        localStorage.setItem('harder', harder);
        $("#harderCost").html("-" + nFormatter(calculateTotalCost(10, harder-1, buyMulti), 1) + " Arcana");
        $("#harderStat").html(nFormatter(harder,1) + " Knowledge/Click");

        faster = 1;
        localStorage.setItem('faster', faster);
        $("#fasterCost").html("-" + nFormatter(calculateTotalCost(50, faster-1, buyMulti), 1) + " Arcana");
        $("#fasterStat").html("x" + nFormatter(faster,1) + " Magic Bonus"); 

        smarter = 0;
        localStorage.setItem('smarter', smarter);
        $("#smarterCost").html("-" + nFormatter(calculateTotalCost(25, smarter, buyMulti), 1) + "Arcana")
        $("#smarterStat").html(nFormatter(smarter, 1) + " Knowledge/Sec")

        longer = 10;
        localStorage.setItem('longer', longer);
        $("#longerCost").html("-" + nFormatter(calculateTotalCost(100, (longer/10)-1, buyMulti), 1) + " Arcana");
        $("#longerStat").html(nFormatter(longer, 1) + " Max Knowledge");

        $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)*(shards+1)), 1);
    };
});

function orb(){
    knowledge += harder;
    
    if (knowledge >= longer){
        var buttonOffset = $("#orb").offset();
    
        // Get the button's width and height
        var buttonWidth = $("#orb").outerWidth();
        var buttonHeight = $("#orb").outerHeight();
    
        // Calculate the center of the button
        var centerX = buttonOffset.left + buttonWidth / 2;
        var centerY = buttonOffset.top + buttonHeight / 2;

        pop(centerX, centerY);
        knowledge = 0;
        arcana += faster*(longer/10)*(shards+1);
        $("#arcanaNum").html(nFormatter(arcana,1));
        localStorage.setItem('arcana',arcana);
    }

    $("#glow").height((knowledge/longer)*100 + "%")
    
    localStorage.setItem('knowledge',knowledge);
}

(function(){

    knowledge += smarter/10;
    if (knowledge >= longer){
        var buttonOffset = $("#orb").offset();
    
        // Get the button's width and height
        var buttonWidth = $("#orb").outerWidth();
        var buttonHeight = $("#orb").outerHeight();
    
        // Calculate the center of the button
        var centerX = buttonOffset.left + buttonWidth / 2;
        var centerY = buttonOffset.top + buttonHeight / 2;

        pop(centerX, centerY);
        knowledge = 0;
        arcana += faster*(longer/10)*(shards+1);
        $("#arcanaNum").html(nFormatter(arcana,1));
        localStorage.setItem('arcana',arcana);
    }

    if (arcana >= 10000){
        $("#shatterText").html("Shatter the Orb");
        $("#shardGain").css("display", "block");
        $("#shardGain").html("+" + nFormatter(arcana/10000,1) + " Shards")
    }
    else{
        $("#shatterText").html("10K Arcana");
        $("#shardGain").css("display", "none");
    }

    $("#glow").height((knowledge/longer)*100 + "%")
    
    localStorage.setItem('knowledge',knowledge);

    setTimeout(arguments.callee, 100);
})();


function calculateTotalCost(base, startUpgrade, numberOfUpgrades) {
    let totalCost = 0;
    
    for (let i = 1; i <= numberOfUpgrades; i++) {
        let currentUpgrade = startUpgrade + i;
        totalCost += base * (currentUpgrade ** 2);
    }
    
    return totalCost;
}

function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "Qa" },
      { value: 1e18, symbol: "Qu" }
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}


function pop(x, y) { 
    // Loop to generate 30 particles at once
    for (let i = 0; i < 50; i++) {
      // We pass the mouse coordinates to the createParticle() function
      createParticle(x, y);
    }
  }
  function createParticle(x, y) {
    // Create a custom particle element
    const particle = document.createElement('particle');
    // Append the element into the body
    document.body.appendChild(particle);

    // Calculate a random size from 5px to 25px
    const size = Math.floor(Math.random() * 100);
    // Apply the size on each particle
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Generate a random color in a blue/purple palette
    particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
  
    // Generate a random x & y destination within a distance of 75px from the mouse
    const destinationX = x + (Math.random() - 0.5) * 2 * 200;
    const destinationY = y + (Math.random() - 0.5) * 2 * 200;
  
    // Store the animation in a variable because we will need it later
    const animation = particle.animate([
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(${x - (size / 2)}px, ${y - (size / 2)}px)`,
        opacity: 1
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0
      }
    ], {
      // Set a random duration from 500 to 1500ms
      duration: 500 + Math.random() * 1000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      // Delay every particle with a random value from 0ms to 200ms
      delay: Math.random() * 200
    });

    animation.onfinish = () => {
        particle.remove();
    };
  }

