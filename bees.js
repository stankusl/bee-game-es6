(function(){

  function $id(id_name_quoted) {
	  return document.getElementById(id_name_quoted);
  }

  //ES6 syntax
  class GameBees {
	  constructor() {
		  for (var i=1;i<=5;i++) {
		   this["Worker"+i]=new Bee('Worker'+i,75,10);
		  }
		  for (var i=1;i<=8;i++) {
		   this["Drone"+i]=new Bee('Drone'+i,50,12);
		  }
		  this.Queen=new Bee('Queen',100,8);
	  }
  }

  class Bee {
	  constructor(name,lifespan,deduction){
		   this.name=name;
		   this.lifespan=lifespan;
		   this.deduction=deduction;
	  }
	  hit(){
		$id(this.name).style.backgroundColor='yellow';
		this.lifespan-=this.deduction;
		$id(this.name).lastChild.innerHTML="Life: "+this.lifespan;
		if (this.lifespan<=0) {
			this.name==="Queen" ? resetGame() : remove(this.name);
		}
		else {
			$id('hit-target').disabled=true;
		    setTimeout(function(){$id(this.name).style.backgroundColor='transparent';$id('hit-target').disabled=false;}.bind(this),300);
		}
	}
  }

  var bees=['Queen','Worker1','Worker2','Worker3','Worker4','Worker5','Drone1','Drone2','Drone3','Drone4','Drone5','Drone6','Drone7','Drone8'];
  var game=new GameBees();
  $id('hit-target').addEventListener('click',hitBee);

  createImg("Queen","queen-bee.png", "section-queen",100)
  for (var i=1; i<=5;i++) {
	  createImg("Worker"+i,"worker-bee.png", "section-workers",75)
  }

  for (var i=1; i<=8;i++) {
	  createImg("Drone"+i,"drone-bee.png", "section-drones",50)
  }

  function resetGame(){
	  alert('Game Over!');
	  location.reload();
  }

  function remove(bee){
	 var index = bees.indexOf(bee);
	 if (index > -1) {
	   bees.splice(index, 1);
	 }
	 $id(bee).parentNode.removeChild($id(bee));
  }

  //After having shuffled the remaining bees, the system hits the first one inside the array
  function hitBee(){
	  $.ajax({
          type:"POST",
          data:{bees:bees},
          url: "/bee.php"
        }).then(function(rawData){
		  data=JSON.parse(rawData);
		  game[data[0]].hit();
	    },
	    function(){
	      console.log('failure');
	    });
  }

  function createImg(name,path,parent,life) {
	  var currentDiv = $id(parent);
	  var newDiv = document.createElement("div");
	  newDiv.id=name;
	  newDiv.style.float='left';
	  newDiv.style.marginTop='30px';
	  currentDiv.appendChild(newDiv);

	  currentDiv = $id(name);
	  newDiv = document.createElement("div");
	  var newContent = document.createTextNode(name);
	  newDiv.appendChild(newContent);
	  currentDiv.appendChild(newDiv);
	  var newImg = document.createElement("img");
	  newImg.src = path;
	  currentDiv.appendChild(newImg);

	  newDiv = document.createElement("div");
	  newContent = document.createTextNode("Life: "+life);
	  newDiv.appendChild(newContent);
	  currentDiv.appendChild(newDiv);
  }
})();
