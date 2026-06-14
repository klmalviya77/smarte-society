export class CreateSocietyPage {
  
  render(): string {
    
    return `
  <div class="container">

    <h1>Create Society</h1>

    <input
      id="societyName"
      type="text"
      placeholder="Society Name"
    >

    <br><br>

    <input
      id="societyAddress"
      type="text"
      placeholder="Address"
    >

    <br><br>

    <h3>Flat Setup</h3>

    <label>
      <input
        type="radio"
        name="flatMode"
        value="auto"
        checked
      >
      Auto Generate Flats
    </label>

    <br>

    <label>
      <input
        type="radio"
        name="flatMode"
        value="manual"
      >
      Manual Flats
    </label>

    <hr>

    <div id="autoSection">

      <input
        id="towerName"
        type="text"
        placeholder="Tower Name (A)"
      >

      <br><br>

      <input
        id="totalFloors"
        type="number"
        placeholder="Total Floors"
      >

      <br><br>

      <input
        id="flatsPerFloor"
        type="number"
        placeholder="Flats Per Floor"
      >

    </div>

    <div
      id="manualSection"
      style="display:none;"
    >

      <textarea
        id="manualFlats"
        rows="8"
        placeholder="One flat per line"
      ></textarea>

    </div>

    <br><br>

    <button id="saveSocietyBtn">
      Save Society
    </button>

    <button id="backBtn">
      Back
    </button>

  </div>
`;
    
  }
  
}