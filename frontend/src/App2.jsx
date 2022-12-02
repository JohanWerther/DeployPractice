import "./App.css";
import { Cascader } from "antd";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState({
    characters: {
      items: [],
    },
  });

  // Traer los personajes: segmentos
  useEffect(() => {
    const getCascaderStructure = async () => {
      const cascaderItems = await fetchData();
      setState({
        characters: {
          items: cascaderItems,
        },
      });
    };
    getCascaderStructure();
  }, []);

  const onChange = (value) => {
    const newUse = {};
    value.forEach((tree) => {
      const [label, character, quoteId] = tree;
      newUse[character] = quoteId;
    });
    const newState = changeAvailableOptions(state, newUse);
    newState.characters.items.forEach((ch) => {
      console.log(`%c ${ch.value}`, "color: red; background-color: white; font-weight: 800; font-size: 32px");
      console.table(ch.children.filter((c, i) => i < 5));
    });
    //setState(newState)
  };

  console.log("App running");

  return (
    <div className="App">
      <Cascader
        multiple
        //value={value}
        options={[
          {
            value: "personajes",
            label: "Personajes",
            children: state.characters.items,
            isLeaf: false,
          },
        ]}
        //loadData={loadData}
        style={{ width: "500px" }}
        onChange={onChange}
      />
    </div>
  );
}

// Deshabilitar opciones
function changeAvailableOptions(prev, uses) {
  // deep clone
  const items = prev.characters.items.map((el) => ({
    ...el,
    children: el.children.map((el) => ({ ...el })),
  }));
  items.forEach((character) => {
    const { children, value: chName } = character;
    const characterInUse = uses.hasOwnProperty(chName);
    if (!characterInUse) {
      return children.forEach((child) => {
        child["disabled"] = false;
      });
    } else {
      //console.log(chName, uses[chName])
      children.forEach((child) => {
        const mustDisable = child.value !== uses[chName];
        child["disabled"] = mustDisable;
      });
    }
  });
  //console.log(items)
  return {
    characters: {
      items,
    },
  };
}

// Returns the final cascader structure.
async function fetchData() {
  const charactersIds = ["1", "2", "3", "7"];
  const characters = await Promise.all(
    charactersIds.map(async (id) => {
      return await fetchCharacterInfo(id);
    })
  );
  const cascaderItems = characters.map((ch) => ({
    value: ch.name,
    label: ch.name,
    children: [{}],
    isLeaf: false,
  }));

  await Promise.all(
    characters.map(async (ch) => {
      return await fetchQuotes(ch.name);
    })
  ).then((val, i) => {
    val.forEach((quotes, i) => (cascaderItems[i].children = quotes));
  });
  return cascaderItems;
}

// Traer las frases: lineas
async function fetchQuotes(name = "") {
  let formated = "";
  let compoundName = name.includes(" ");
  if (compoundName) {
    formated = name.replace(" ", "+");
  }
  const url = compoundName
    ? `https://breakingbadapi.com/api/quote?author=${formated}`
    : `https://breakingbadapi.com/api/quote?author=${name}`;
  const res = await fetch(url);
  const data = await res.json();
  const itemChildren = data.map((el) => ({
    value: el.quote_id,
    label: el.quote,
    disabled: false,
  }));
  return itemChildren;
}

// Traer información inicial de los personajes
async function fetchCharacterInfo(id) {
  const res = await fetch(`https://breakingbadapi.com/api/characters/` + id);
  const data = await res.json();
  const char_Obj = {
    name: data[0].name,
    id: data[0].char_id,
  };
  return char_Obj;
}

export default App;

/* 
https://breakingbadapi.com/api/quote?author=Jesse+Pinkman
https://breakingbadapi.com/api/characters/28
https://breakingbadapi.com/api/characters/45
*/
