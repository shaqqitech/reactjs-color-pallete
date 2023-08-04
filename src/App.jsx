import { useState } from 'react';

const ColorPaletteApp = () => {
  const maxPaletteBoxes = 20;
  const [colors, setColors] = useState([]);

  const generateRandomColor = () => {
    let randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    randomHex = `#${randomHex.padStart(6, '0')}`;
    return randomHex;
  };

  const generatePalette = () => {
    const newColors = [];
    for (let i = 0; i < maxPaletteBoxes; i++) {
      newColors.push(generateRandomColor());
    }
    setColors(newColors);
  };

  const copyColor = (hexVal) => {
    navigator.clipboard.writeText(hexVal).then(() => {
      const colorIndex = colors.indexOf(hexVal);
      console.log(colorIndex);
      if (colorIndex !== -1) {
        const updatedColors = [...colors];
        console.log(updatedColors);
        updatedColors[colorIndex] = 'Code Copied';
        setColors(updatedColors);

        setTimeout(() => {
          updatedColors[colorIndex] = hexVal;
          setColors(updatedColors);
        }, 2000);
      }
    });
  };



  return (
    <>
    <div className=' bg-gray-800 w-[100%] h-[100vh]'>
      <div className="container flex flex-wrap justify-center gap-8 p-4">
        {colors.map((color, index) => (
          <div key={index} className="color border-2 rounded-xl flex flex-col justify-center items-center overflow-hidden ease-out">
            <div
              className='hex-box w-32 h-32 rounded-lg cursor-pointer border-2 hover:scale-105'
              style={{ background: color }}
              onClick={() => copyColor(color)}
            ></div>
            <span className="hex-value text-white">{color}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="refreshBtn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 fixed bottom-12"
          onClick={generatePalette}
        >
          Refresh Button
        </button>
      </div>
    </div>
    </>
  );
};

export default ColorPaletteApp;
