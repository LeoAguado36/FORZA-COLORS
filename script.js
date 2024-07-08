document.getElementById('colorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const colorInput = document.getElementById('colorInput').value.trim();
    let fh5ColorCode = '';
    let hueValue = 0;
    let saturationValue = 0;
    let brightnessValue = 0;

    // Function to convert hex to RGB
    function hexToRgb(hex) {
        let bigint = parseInt(hex.substring(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return [r, g, b];
    }

    // Function to convert RGB to HSB
    function rgbToHsb(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let h, s, v = max;
        let d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, v];
    }

    // Function to convert hex, Pantone, or RGB to FH5 color code
    function convertToFH5ColorCode(color) {
        if (color.startsWith('#')) {
            // Convert hex to RGB
            const rgb = hexToRgb(color);
            const hsb = rgbToHsb(rgb[0], rgb[1], rgb[2]);
            hueValue = hsb[0];
            saturationValue = hsb[1];
            brightnessValue = hsb[2];
            fh5ColorCode = `H: ${hueValue.toFixed(2)}, S: ${saturationValue.toFixed(2)}, B: ${brightnessValue.toFixed(2)}`;
        } else if (color.startsWith('PANTONE')) {
            // Convert Pantone to RGB (dummy values used here)
            // Replace this with actual Pantone to RGB conversion
            const rgb = [255, 0, 0]; // Dummy RGB value
            const hsb = rgbToHsb(rgb[0], rgb[1], rgb[2]);
            hueValue = hsb[0];
            saturationValue = hsb[1];
            brightnessValue = hsb[2];
            fh5ColorCode = `H: ${hueValue.toFixed(2)}, S: ${saturationValue.toFixed(2)}, B: ${brightnessValue.toFixed(2)}`;
        } else if (color.startsWith('rgb')) {
            // Convert RGB to HSB
            const rgb = color.match(/\d+/g).map(Number);
            const hsb = rgbToHsb(rgb[0], rgb[1], rgb[2]);
            hueValue = hsb[0];
            saturationValue = hsb[1];
            brightnessValue = hsb[2];
            fh5ColorCode = `H: ${hueValue.toFixed(2)}, S: ${saturationValue.toFixed(2)}, B: ${brightnessValue.toFixed(2)}`;
        } else {
            fh5ColorCode = 'Invalid color format';
        }
    }

    convertToFH5ColorCode(colorInput);
    document.getElementById('fh5ColorCode').textContent = fh5ColorCode;

    // Update slider values based on FH5 color code
    document.getElementById('hue').value = hueValue;
    document.getElementById('saturation').value = saturationValue;
    document.getElementById('brightness').value = brightnessValue;
});
