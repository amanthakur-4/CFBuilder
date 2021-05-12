import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup, Navbar, Nav } from 'react-bootstrap';


function App() {

  const [inputNameList, setInputNameList] = useState([
    { fileName: "" }
  ]);

  // Function for updating the strings in each object when a change is made to the text inside the "File name" input box
  const handleInputNameChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputNameList];
    list[index][name] = value;
    setInputNameList(list);
  };

  // Instantiation of the object list that houses all inputs from the "File name" input field
  const [inputStepList, setInputStepList] = useState([
    { stepName: "", stepParentheses: "", stepType: "PCR" }
  ]);

  // Function for updating the strings in each object when a change is made to the text inside the "Manipulations" input boxes
  const handleInputStepChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputStepList];
    list[index][name] = value;
    setInputStepList(list);
  };
  
  // Logic for handling the addition of various manipulation input boxes. Each button passes a different
  // "step" id into the function which is then used to determine which type of manipulation should be added
  const handleAddInput = step => {
    switch(step) {
      case 0:
        setInputStepList([...inputStepList, {stepName: "", stepParentheses: "", stepType: "PCR"}]);
        break;
      case 1:
        setInputStepList([...inputStepList, {stepName: "", stepParentheses: "", stepType: "Digest"}]);
        break;
      case 2:
        setInputStepList([...inputStepList, {stepName: "", stepParentheses: "", stepType: "Assemble"}]);
        break;
      case 3:
        setInputStepList([...inputStepList, {stepName: "", stepParentheses: "", stepType: "Transform"}]);
        break;
      default:
        break;
    }
  };

  // Function for removing the selected manipulation input box
  const handleRemoveInputStep = index => {
    const list = [...inputStepList];
    list.splice(index, 1);
    setInputStepList(list);
  }

  // Instantiation of the object list that houses all inputs from the "Oligo" input fields
  const [inputOligoList, setInputOligoList] = useState([
    { oligoName: "", oligoSeq: "" }
  ]);

  // Function for updating the strings in each object when a change is made to the text inside the "Oligos" input boxes
  const handleInputOligoChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputOligoList];
    list[index][name] = value;
    setInputOligoList(list);
  };

  // Function for handling the addition of various oligo input boxes
  const handleAddInputOligo = () => {
    setInputOligoList([...inputOligoList, {oligoName: "", oligoSeq: ""}]);
  };

  // Function for removing the selected oligo input box
  const handleRemoveInputOligo = index => {
    const list = [...inputOligoList];
    list.splice(index, 1);
    setInputOligoList(list);
  }

  // Instantiation of the object list that houses all inputs from the "Plasmid" input fields
  const [inputPlasmidList, setInputPlasmidList] = useState([
    { plasmidName: "", plasmidSeq: "" }
  ]);

  // Function for updating the strings in each object when a change is made to the text inside the "Plasmid" input boxes
  const handleInputPlasmidChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputPlasmidList];
    list[index][name] = value;
    setInputPlasmidList(list);
  };

  // Function for handling the addition of various plasmid input boxes
  const handleAddInputPlasmid = () => {
    setInputPlasmidList([...inputPlasmidList, {plasmidName: "", plasmidSeq: ""}]);
  };

  // Function for removing the selected oligo input box
  const handleRemoveInputPlasmid = index => {
    const list = [...inputPlasmidList];
    list.splice(index, 1);
    setInputPlasmidList(list);
  }

  // This function takes all the strings enetered into the input boxes and concatenates them into one large string.
  // It iterates through each list of inputs (inputStepList, inputOligoList, inputPlasmidList -- in this order) and adds the proper
  // formatting. It then makes a call to 'makeTextFile' and passes along the completed string.
  const concatString = (stepStrings, oligoStrings, plasmidStrings, fileName) => {
    var fileString = "";
    if (stepStrings.length > 0) {
      var temp = "";
      for (let i = 0; i < stepStrings.length; i++) {
        fileString += stepStrings[i].stepType;
        fileString += " ";
        fileString += stepStrings[i].stepName;
        fileString += "\t\t";
        temp = "(" + stepStrings[i].stepParentheses + ")"; 
        fileString += temp;
        fileString += "\n";
      }
      fileString += "------------------";
      fileString += "\n";
    }

    if (oligoStrings.length > 0) {
      for (let i = 0; i < oligoStrings.length; i++) {
        fileString += ">";
        fileString += oligoStrings[i].oligoName;
        fileString += "\n";
        fileString += oligoStrings[i].oligoSeq;
        fileString += "\n";
      }
    }

    if (plasmidStrings.length > 0) {
      for (let i = 0; i < plasmidStrings.length; i++) {
        fileString += ">";
        fileString += plasmidStrings[i].plasmidName;
        fileString += "\n";
        fileString += plasmidStrings[i].plasmidSeq;
        fileString += "\n";
      }
    }
    makeTextFile(fileString, fileName)
  }

  // This function takes a string and inserts it into a text file, which is then downloaded 
  const makeTextFile = (finalString, fileName) => {
    var fileTitle = fileName[0].fileName + ".txt";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalString));
    element.setAttribute('download', fileTitle);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return (
    <div className="App">
      <header>
        <Navbar bg="light" variant="light">
          <Navbar.Brand href="#home"><h2>Construction File Builder</h2></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Experiment1</Nav.Link>
            <Nav.Link href="#features">Experiment2</Nav.Link>
          </Nav>
        </Navbar>
      </header>
      <body>
        <div class="input-group-main">
          
            <p class="input-label">Enter file name:</p>
            {inputNameList.map((item, i) => {
                return(
                  <div class="input-container">
                    <InputGroup className="mb-3" class="input-pcr-step">
                      <InputGroup.Prepend>
                        <InputGroup.Text>File name</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        aria-label="Default"
                        aria-describedby="input-file-name"
                        placeholder="PConstruction of KanR Basic Part Bca9128"
                        name="fileName"
                        value={item.fileName}
                        onChange={e => handleInputNameChange(e, i)}
                      />
                    </InputGroup>
                  </div>
              );
            })}
          
          <p class="input-label">Enter Manipulations:</p>
          {inputStepList.map((item, i) => {
            return(
              <div class="input-container">
                <InputGroup className="mb-3" class="input-pcr-step">
                  <InputGroup.Prepend>
                    <InputGroup.Text>{ item.stepType }</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="input-pcr-step-name"
                    placeholder="PF3a,BR3a on pLYC33K"
                    name="stepName"
                    value={item.stepName}
                    onChange={e => handleInputStepChange(e, i)}
                  />
                  <FormControl
                    aria-label="Default"
                    aria-describedby="input-pcr-step-parentheses"
                    placeholder="4739 bp, back1"
                    name="stepParentheses"
                    value={item.stepParentheses}
                    onChange={e => handleInputStepChange(e, i)}
                  />
                  <Button variant="outline-danger" aria-describedby="delete-step" onClick={() => handleRemoveInputStep(i)}>X</Button>{' '}
                </InputGroup> 
              </div>
            );
          })}

          <div class="add-step-container">
            <Button variant="primary" onClick={e => handleAddInput(0)}>Add PCR</Button>{' '}
            <Button variant="primary" onClick={e => handleAddInput(1)}>Add Digest</Button>{' '}
            <Button variant="primary" onClick={e => handleAddInput(2)}>Add Assemble</Button>{' '}
            <Button variant="primary" onClick={e => handleAddInput(3)}>Add Transform</Button>{' '}
          </div>
          
          <p class="input-label">Enter oligos:</p>
          {inputOligoList.map((item, i) => {
            return(
              <div class="input-container"> 
                  <InputGroup className="mb-3" class="input-text-field">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="input-oligo">Oligo</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="input-oligo"
                      placeholder="oB2F"
                      name="oligoName"
                      value={item.oligoName}
                      onChange={e => handleInputOligoChange(e, i)}
                    />
                    <FormControl
                      aria-label="Default"
                      aria-describedby="input-oligo"
                      placeholder="attaccgcctttgagtgagc"
                      name="oligoSeq"
                      value={item.oligoSeq}
                      onChange={e => handleInputOligoChange(e, i)}
                    />
                    <Button variant="outline-danger" aria-describedby="delete-oligo" onClick={() => handleRemoveInputOligo(i)}>X</Button>{' '}
                  </InputGroup>
              </div>
            );
          })}

          <div class="add-step-container">
            <Button variant="primary" onClick={e => handleAddInputOligo()}>Add Oligo</Button>{' '}
          </div>

          <p class="input-label">Enter plasmid template:</p>
          {inputPlasmidList.map((item, i) => {
            return(
              <div class="input-container">
                <InputGroup className="mb-3" class="input-text-field">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Plasmid Template</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl 
                    as="textarea" 
                    aria-label="Plasmid name" 
                    aria-describedby="input-plasmid-name"
                    placeholder="pLYC18"
                    name="plasmidName"
                    value={item.plasmidName}
                    onChange={e => handleInputPlasmidChange(e, i)}
                  />
                  <FormControl 
                    as="textarea" 
                    aria-label="Plasmid sequence" 
                    aria-describedby="input-plasmid-sequence"
                    placeholder="*Plasmid Sequence*"
                    name="plasmidSeq"
                    value={item.plasmidSeq}
                    onChange={e => handleInputPlasmidChange(e, i)}
                  />
                  <Button variant="outline-danger" aria-describedby="delete-plasmid" onClick={() => handleRemoveInputPlasmid(i)}>X</Button>{' '}
                </InputGroup>
              </div>
            );
          })}

          <div class="add-step-container">
            <Button variant="primary" onClick={e => handleAddInputPlasmid()}>Add Plasmid</Button>{' '}
          </div>
          
          <div class="create-button">
            <Button variant="success" onClick={e => concatString(inputStepList, inputOligoList, inputPlasmidList, inputNameList)}>Create Construction File</Button>{' '}
          </div>
        </div>

        {/* The following code is used for debugging purposes to determine what data is being stored in the various arrays */}
        {/* <pre>
          {JSON.stringify(inputNameList, null, 2)}
          {JSON.stringify(inputStepList, null, 2)}
          {JSON.stringify(inputOligoList, null, 2)}
          {JSON.stringify(inputPlasmidList, null, 2)}
        </pre> */}
      </body>
    </div>
  );
}

export default App;
