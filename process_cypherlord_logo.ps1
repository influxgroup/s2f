Add-Type -AssemblyName System.Drawing

$src = "C:\Users\NEXHub\.gemini\antigravity-ide\brain\bca5181d-d0f2-4234-bfa3-882fdf6ef1e2\media__1787298075820.png"
if (-not (Test-Path $src)) {
    Write-Error "Source image not found at $src"
    exit 1
}

$img = [System.Drawing.Image]::FromFile($src)
Write-Host "Image Dimensions: $($img.Width) x $($img.Height)"

$bmp = New-Object System.Drawing.Bitmap($img)
$w = $bmp.Width
$h = $bmp.Height

# Create a new ARGB bitmap for background removal
$transparentBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Threshold for white background removal with smooth alpha edge handling
for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $c = $bmp.GetPixel($x, $y)
        
        # Calculate brightness
        $brightness = ($c.R + $c.G + $c.B) / 3.0
        
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            # Fully transparent white background
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($c.R -gt 200 -and $c.G -gt 200 -and $c.B -gt 200) {
            # Soft edge anti-aliasing blending transition
            $alpha = [int](255 * (255 - $brightness) / 55.0)
            if ($alpha -lt 0) { $alpha = 0 }
            if ($alpha -gt 255) { $alpha = 255 }
            $transparentBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
        } else {
            # Keep original pixel
            $transparentBmp.SetPixel($x, $y, $c)
        }
    }
}

# Auto-crop bounding box of non-transparent content
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $px = $transparentBmp.GetPixel($x, $y)
        if ($px.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Content Bounding Box: MinX=$minX, MaxX=$maxX, MinY=$minY, MaxY=$maxY"

$cropW = ($maxX - $minX) + 1
$cropH = ($maxY - $minY) + 1

$cropped = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gCrop = [System.Drawing.Graphics]::FromImage($cropped)
$gCrop.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$gCrop.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gCrop.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gCrop.DrawImage($transparentBmp, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), (New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)), [System.Drawing.GraphicsUnit]::Pixel)
$gCrop.Dispose()

# Save transparent cropped master logo
$masterPath = "d:\DownloadsZee\veritech\src\assets\cypherlord_logo_master.png"
$cropped.Save($masterPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved master logo to $masterPath ($cropW x $cropH)"

# Helper function to render resized high quality logo
function Save-Resized {
    param([System.Drawing.Bitmap]$Bmp, [int]$TargetHeight, [string]$OutPath)
    $aspect = $Bmp.Width / $Bmp.Height
    $targetWidth = [int]($TargetHeight * $aspect)
    
    $dest = New-Object System.Drawing.Bitmap($targetWidth, $TargetHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($Bmp, 0, 0, $targetWidth, $TargetHeight)
    $g.Dispose()
    
    $dest.Save($OutPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved resized image: $OutPath ($targetWidth x $TargetHeight)"
}

# Generate Header Logo asset (Height 60px)
Save-Resized -Bmp $cropped -TargetHeight 120 -OutPath "d:\DownloadsZee\veritech\src\assets\cypherlord_logo_header.png"

# Generate Footer Logo asset (Height 140px)
Save-Resized -Bmp $cropped -TargetHeight 140 -OutPath "d:\DownloadsZee\veritech\src\assets\cypherlord_logo_footer.png"

# Generate High Res Asset (Height 400px)
Save-Resized -Bmp $cropped -TargetHeight 400 -OutPath "d:\DownloadsZee\veritech\src\assets\cypherlord_logo_400.png"

$cropped.Dispose()
$transparentBmp.Dispose()
$bmp.Dispose()
$img.Dispose()
