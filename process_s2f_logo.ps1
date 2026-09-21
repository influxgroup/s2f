Add-Type -AssemblyName System.Drawing

$src = "C:\Users\NEXHub\.gemini\antigravity-ide\brain\a0cd5d4f-0c6f-4223-8b24-11b3e577a71f\.user_uploaded\media_1789570227794.jpg"
if (-not (Test-Path $src)) {
    Write-Error "Source logo not found at $src"
    exit 1
}

$rawImg = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($rawImg)
$w = $bmp.Width
$h = $bmp.Height

Write-Host "Source Image Size: $w x $h"

# 1. Create a transparent version by converting dark background to transparent with smooth alpha falloff
$transparentBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $c = $bmp.GetPixel($x, $y)
        $maxChannel = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        
        # Black background keying:
        # If very dark (maxChannel < 12), make fully transparent
        if ($maxChannel -le 10) {
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($maxChannel -le 35) {
            # Smooth transition for soft glows and anti-aliasing edges
            $alpha = [int](255.0 * ($maxChannel - 10) / 25.0)
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            # Keep original pixel
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
        }
    }
}

# 2. Find bounding box of non-transparent content
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $px = $transparentBmp.GetPixel($x, $y)
        if ($px.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add small padding
$pad = 6
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropR = [Math]::Min($w - 1, $maxX + $pad)
$cropB = [Math]::Min($h - 1, $maxY + $pad)
$cropW = $cropR - $cropX + 1
$cropH = $cropB - $cropY + 1

Write-Host "Cropping full lockup: ($cropX, $cropY, $cropW, $cropH)"

$fullCropped = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g1 = [System.Drawing.Graphics]::FromImage($fullCropped)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g1.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g1.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g1.DrawImage($transparentBmp, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), (New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)), [System.Drawing.GraphicsUnit]::Pixel)
$g1.Dispose()

# Save master full transparent
$assetsDir = "d:\DownloadsZee\veritech\src\assets"
if (-not (Test-Path $assetsDir)) { New-Item -ItemType Directory -Path $assetsDir -Force }
$publicDir = "d:\DownloadsZee\veritech\public"
if (-not (Test-Path $publicDir)) { New-Item -ItemType Directory -Path $publicDir -Force }

$fullCropped.Save("$assetsDir\s2f_logo_transparent.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved transparent full logo to $assetsDir\s2f_logo_transparent.png"

# Helper to save resized
function Resize-Image {
    param([System.Drawing.Bitmap]$source, [int]$targetW, [int]$targetH, [string]$outPath)
    $dest = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($source, 0, 0, $targetW, $targetH)
    $g.Dispose()
    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved resized: $outPath ($targetW x $targetH)"
}

# 3. Header logo: target height 110px (scaled proportionally)
$headerH = 110
$headerW = [int]($cropW * ($headerH / $cropH))
Resize-Image -source $fullCropped -targetW $headerW -targetH $headerH -outPath "$assetsDir\s2f_logo_header.png"

# 4. Footer logo: target height 180px
$footerH = 180
$footerW = [int]($cropW * ($footerH / $cropH))
Resize-Image -source $fullCropped -targetW $footerW -targetH $footerH -outPath "$assetsDir\s2f_logo_footer.png"

# 5. Core Emblem for Favicon:
# Find emblem box (above row 595)
$embMinX = $w; $embMaxX = 0; $embMinY = $h; $embMaxY = 0
for ($y = $cropY; $y -le 595; $y++) {
    for ($x = $cropX; $x -le $cropR; $x++) {
        $px = $transparentBmp.GetPixel($x, $y)
        if ($px.A -gt 25) {
            if ($x -lt $embMinX) { $embMinX = $x }
            if ($x -gt $embMaxX) { $embMaxX = $x }
            if ($y -lt $embMinY) { $embMinY = $y }
            if ($y -gt $embMaxY) { $embMaxY = $y }
        }
    }
}
$embPad = 8
$embX = [Math]::Max(0, $embMinX - $embPad)
$embY = [Math]::Max(0, $embMinY - $embPad)
$embW = ($embMaxX - $embMinX + 1) + ($embPad * 2)
$embH = ($embMaxY - $embMinY + 1) + ($embPad * 2)

# Make emblem square
$sqDim = [Math]::Max($embW, $embH)
$sqBmp = New-Object System.Drawing.Bitmap($sqDim, $sqDim, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gSq = [System.Drawing.Graphics]::FromImage($sqBmp)
$gSq.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gSq.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gSq.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$gSq.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$offsetX = [int](($sqDim - $embW) / 2)
$offsetY = [int](($sqDim - $embH) / 2)
$gSq.DrawImage($transparentBmp, (New-Object System.Drawing.Rectangle($offsetX, $offsetY, $embW, $embH)), (New-Object System.Drawing.Rectangle($embX, $embY, $embW, $embH)), [System.Drawing.GraphicsUnit]::Pixel)
$gSq.Dispose()

$sqBmp.Save("$assetsDir\s2f_emblem_square.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved square emblem to $assetsDir\s2f_emblem_square.png ($sqDim x $sqDim)"

# Generate Favicons: 32x32, 64x64, 180x180 (Apple touch icon) and 512x512
Resize-Image -source $sqBmp -targetW 32 -targetH 32 -outPath "$publicDir\favicon-32x32.png"
Resize-Image -source $sqBmp -targetW 64 -targetH 64 -outPath "$publicDir\favicon.png"
Resize-Image -source $sqBmp -targetW 180 -targetH 180 -outPath "$publicDir\apple-touch-icon.png"
Resize-Image -source $sqBmp -targetW 512 -targetH 512 -outPath "$publicDir\android-chrome-512x512.png"

# Also copy raw original to assets as s2f_logo_raw.jpg
Copy-Item -Path $src -Destination "$assetsDir\s2f_logo_raw.jpg" -Force

$sqBmp.Dispose()
$fullCropped.Dispose()
$transparentBmp.Dispose()
$bmp.Dispose()
$rawImg.Dispose()
Write-Host "All S2F logos and favicons processed successfully!"
