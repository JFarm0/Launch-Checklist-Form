// Write your JavaScript code here!
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then (function(response) {
      response.json().then( function(json) {
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[2].name}</li>
                  <li>Diameter: ${json[2].diameter}</li>
                  <li>Star: ${json[2].star}</li>
                  <li>Distance from Earth: ${json[2].distance}</li>
                  <li>Number of Moons: ${json[2].moons}</li>
               </ol>
               <img src="${json[2].image}">
         `
      })
   })

   let form = document.getElementById("launchForm");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelLevelStatus = document.getElementById("fuelStatus");
   
   let faultyItemList = document.getElementById("faultyItems");
   // faultyItemList.style.visibility = "hidden";
   // console.log(faultyItems)
   
   let launchStatus = document.getElementById("launchStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
      }

      else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert ("Both Fuel Level and cargo mass must be a number");
      }

      else {
         faultyItemList.style.visibilty = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch.`;
         copilotStatus.innerHTML = `Co-pilot ${copilotStatus.value} is ready for launch.`
         
         console.log(typeof fuelLevelInput.value)

         if (Number(fuelLevelInput.value) < 10000 && Number(cargoMassInput.value) < 10000) {
            fuelLevelStatus.innerHTML = `Fuel level too low for launch.`;
            launchStatus.style.color = "#c7254e";
            launchStatus.innerHTML = `Shuttle not ready for launch.`
            faultyItemList.style.visibility = "visible";
            // console.log(faultyItemList)
         }
   
         else if (Number(cargoMassInput.value) > 10000 && Number(fuelLevelInput.value) > 10000) {
            cargoStatus.innerHTML = `Too much mass for launch.`;
            faultyItemList.style.visibility = "visible";
            launchStatus.style.color = "#c7254e";
            launchStatus.innerHTML = `Shuttle not ready for launch.`
         }

         else if (Number(cargoMassInput.value) > 10000 && Number(fuelLevelInput.value) < 10000) {
            fuelLevelStatus.innerHTML = `Fuel level too low for launch.`;
            cargoStatus.innerHTML = `Too much mass for launch`;
            launchStatus.style.color = "#c7254e";
            launchStatus.innerHTML = `Shuttle not ready for launch.`
            faultyItemList.style.visibility = "visible";
         }
   
         else {
            launchStatus.style.color = "#419f6a";     
            launchStatus.innerHTML = `Shuttle is ready for launch.`
         }
      }

   })
})



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
