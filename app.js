$(document).ready(function(){
    let knowledge = Number(localStorage.getItem('knowledge'));
    $("#glow").height(knowledge*10 + "%")

    let arcana = Number(localStorage.getItem('arcana'));
    $("#arcanaNum").html(nFormatter(arcana, 2));
    
    let shards = Number(localStorage.getItem('shards'));
    if(shards >= 1){
        $("#shardStat").css("display", "block");
        $("#shardStat").html(nFormatter(shards, 2) + " Shards")
    }

    let harder = Number(localStorage.getItem('harder'));
    if (harder === null) {
        harder = 1;
        localStorage.setItem('harder', harder);
    }
    $("#harderCost").html("-" + nFormatter(10*(Math.pow(harder, 2)),2) + " Arcana");
    $("#harderStat").html(nFormatter(harder, 2) + " Knowledge/Click");

    let faster = Number(localStorage.getItem('faster'));
    if (faster === null){
        faster = 1;
        localStorage.setItem('faster', faster);
    }
    $("#fasterCost").html("-" + nFormatter(50*(Math.pow(faster, 2))) + " Arcana");
    $("#fasterStat").html("x" + nFormatter(faster, 2) + " Magic Bonus");

    let smarter = Number(localStorage.getItem('smarter'));
    $("#smarterCost").html("-" + nFormatter(100*(Math.pow(smarter+1, 2)),2) + " Arcana");
    $("#smarterStat").html(nFormatter(smarter,2) + " Knowledge/Second");
    
    let longer = Number(localStorage.getItem('longer'));
    if (longer === null){
        longer = 10;
        localStorage.setItem('longer', longer);
    }
    $("#longerCost").html("-" + nFormatter(100*(Math.pow(longer/10, 2)),2) + " Arcana");
    $("#longerStat").html(nFormatter(longer,2) + " Max Knowledge");

    $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)),2);

    (function(){
        knowledge += smarter/10;
        if (knowledge >= longer){
            pop($(window).width()/2, $(window).height()/2);
            knowledge = 0;
            arcana += faster*(longer/10)*(shards+1);
            $("#arcanaNum").html(nFormatter(arcana,2));
            localStorage.setItem('arcana',arcana);
        }

        if (arcana >= 10000){
            $("#shatterText").html("Shatter the Orb");
            $("#shardGain").css("display", "block");
            $("#shardGain").html("+" + nFormatter(arcana/10000,2) + " Shards")
        }
        else{
            $("#shatterText").html("10K Arcana");
            $("#shardGain").css("display", "none");
        }

        $("#glow").height((knowledge/longer)*100 + "%")
        
        localStorage.setItem('knowledge',knowledge);

        setTimeout(arguments.callee, 100);
    })();

    $("#orb").click(function(){
        knowledge += harder;
        
        if (knowledge >= longer){
            pop($(window).width()/2, $(window).height()/2);
            knowledge = 0;
            arcana += faster*(longer/10)*(shards+1);
            $("#arcanaNum").html(nFormatter(arcana,2));
            localStorage.setItem('arcana',arcana);
        }

        $("#glow").height((knowledge/longer)*100 + "%")
        
        localStorage.setItem('knowledge',knowledge);
    });

    $("#ponderHarder").click(function(){
        if (arcana >= 10*(Math.pow(harder, 2))){
            arcana -= 10*(Math.pow(harder, 2));
            localStorage.setItem('arcana', arcana);
            $("#arcanaNum").html(nFormatter(arcana,2));

            harder += 1;
            localStorage.setItem('harder', harder);

            $("#harderCost").html("-" + nFormatter(10*(Math.pow(harder, 2)),2) + " Arcana");
            $("#harderStat").html(nFormatter(harder, 2) + " Knowledge/Click");
        }
    });

    $("#ponderFaster").click(function(){
        if (arcana >= 50*(Math.pow(faster, 2))){
            arcana -= 50*(Math.pow(faster, 2));
            localStorage.setItem('arcana', arcana);
            $("#arcanaNum").html(nFormatter(arcana,2));

            faster += 1;
            localStorage.setItem('faster', faster);

            $("#fasterCost").html("-" + nFormatter(50*(Math.pow(faster, 2)),2) + " Arcana");
            $("#fasterStat").html("x" + nFormatter(faster,2) + " Magic Bonus");
            $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)*(shards+1)),2);
        }
    });

    $("#ponderSmarter").click(function(){
        if (arcana >= 100*(Math.pow(smarter+1, 2))){
            arcana -= 100*(Math.pow(smarter+1, 2));
            localStorage.setItem('arcana', nFormatter(arcana,2));
            $("#arcanaNum").html(arcana);

            smarter += 1;
            localStorage.setItem('smarter', smarter);

            $("#smarterCost").html("-" + nFormatter(100*(Math.pow(smarter+1, 2)),2) + " Arcana");
            $("#smarterStat").html(nFormatter(smarter,2) + " Knowledge/Second");
        }
    });

    $("#ponderLonger").click(function(){
        if (arcana >= 100*(Math.pow(longer/10, 2))){
            arcana -= 100*(Math.pow(longer/10, 2));
            localStorage.setItem('arcana', arcana);
            $("#arcanaNum").html(nFormatter(arcana,2));

            longer += 10;
            localStorage.setItem('longer', longer);

            $("#longerCost").html("-" + nFormatter(100*(Math.pow(longer/10, 2)),2) + " Arcana");
            $("#longerStat").html(nFormatter(longer,2) + " Max Knowledge");
            $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)*(shards+1)),2);
        }
    });

    $("#shatter").click(function(){
        if (arcana>= 10000){
            shards += arcana/10000;
            localStorage.setItem('shards', shards);
            $("#shardStat").css("display", "block");
            $("#shardStat").html(nFormatter(shards,2) + " Shards")
            reset();
        }
    });

    $("#reset").click(function(){
        reset();
        localStorage.setItem('shards', 0);
        $("#shardStat").html(nFormatter(shards) + " Shards")
    });

    function reset(){
        localStorage.clear()
        localStorage.setItem('shards', shards);

        arcana = 0;
        $("#arcanaNum").html(nFormatter(arcana,2));

        knowledge = 0;
        $("#glow").height(knowledge*10 + "%")

        harder = 1;
        localStorage.setItem('harder', harder);
        $("#harderCost").html("-" + nFormatter(10*(Math.pow(harder, 2)),2) + " Arcana");
        $("#harderStat").html(nFormatter(harder,2) + " Knowledge/Click");

        faster = 1;
        localStorage.setItem('faster', faster);
        $("#fasterCost").html("-" + nFormatter(50*(Math.pow(faster, 2)),2) + " Arcana");
        $("#fasterStat").html("x" + nFormatter(faster,2) + " Magic Bonus"); 

        smarter = 0;
        localStorage.setItem('smarter', smarter);
        $("#smarterCost").html("-" + nFormatter(100*(Math.pow(smarter+1, 2)),2) + "Arcana")
        $("#smarterStat").html(nFormatter(smarter,2) + " Knowledge/Second")

        longer = 10;
        localStorage.setItem('longer', longer);
        $("#longerCost").html("-" + nFormatter(100*(Math.pow(longer/10, 2)),2) + " Arcana");
        $("#longerStat").html(nFormatter(longer,2) + " Max Knowledge");

        $("#totalPonder").html("Magic on Ponder: " + nFormatter(faster*(longer/10)*(shards+1)),2);
    };
});

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

