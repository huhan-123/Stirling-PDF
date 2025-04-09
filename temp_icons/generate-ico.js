const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

// 从临时PNG文件生成ICO
async function generateIco() {
  try {
    const pngFiles = [
      'temp-16.png',
      'temp-32.png',
      'temp-48.png',
      'temp-64.png'
    ];
    
    // 检查所有文件是否存在
    for (const file of pngFiles) {
      if (!fs.existsSync(file)) {
        console.error(`File ${file} does not exist. Please run generate-icons.js first.`);
        return;
      }
    }
    
    const buffer = await pngToIco(pngFiles);
    fs.writeFileSync('../src/main/resources/static/favicon.ico', buffer);
    console.log('Successfully created favicon.ico');
    
    // 清理临时文件
    pngFiles.forEach(file => {
      fs.unlinkSync(file);
      console.log(`Deleted temporary file ${file}`);
    });
  } catch (err) {
    console.error('Error generating ICO:', err);
  }
}

generateIco(); 