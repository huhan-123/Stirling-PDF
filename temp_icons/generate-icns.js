const fs = require('fs');
const path = require('path');
const svg2png = require('svg2png');
const pngToIcns = require('png-to-icns');

async function generateIcns() {
  try {
    // 生成高分辨率PNG (1024x1024 是.icns的推荐尺寸)
    const svgContent = fs.readFileSync('../src/main/resources/static/favicon.svg');
    const pngBuffer = await svg2png(svgContent, { width: 1024, height: 1024 });
    
    // 保存临时PNG
    const tempPngPath = 'temp-1024.png';
    fs.writeFileSync(tempPngPath, pngBuffer);
    console.log(`Created temporary file ${tempPngPath}`);
    
    // 生成.icns文件
    const icnsPath = '../src/main/resources/static/favicon.icns';
    await pngToIcns(tempPngPath, icnsPath);
    console.log(`Successfully created ${icnsPath}`);
    
    // 清理临时文件
    fs.unlinkSync(tempPngPath);
    console.log(`Deleted temporary file ${tempPngPath}`);
  } catch (err) {
    console.error('Error generating ICNS:', err);
  }
}

generateIcns(); 