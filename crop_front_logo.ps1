Add-Type -AssemblyName System.Drawing

$sourcePath = "C:\Users\NEXHub\.gemini\antigravity-ide\brain\0d0547c2-305a-41fe-84df-0a9ddd54c90b\veritech_front_facing_logo_1785239451023.png"
$img = [System.Drawing.Image]::FromFile($sourcePath)

# Full logo lockup crop area (Shield + VERITECH NETWORK typography)
$cropArea = New-Object System.Drawing.Rectangle(65, 320, 890, 360)
$croppedBmp = New-Object System.Drawing.Bitmap(890, 360)

$g = [System.Drawing.Graphics]::FromImage($croppedBmp)
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, 890, 360)), $cropArea, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

function Resize-Bitmap {
    param([System.Drawing.Bitmap]$Bmp, [int]$Width, [int]$Height, [string]$OutputPath)
    $dest = New-Object System.Drawing.Bitmap($Width, $Height)
    $gr = [System.Drawing.Graphics]::FromImage($dest)
    $gr.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gr.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gr.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gr.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gr.DrawImage($Bmp, 0, 0, $Width, $Height)
    $gr.Dispose()
    $dest.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Saved: $OutputPath ($Width x $Height)"
}

# 1. Full Lockup Header Logo (Height 52px, proportional width ~128px)
# Aspect ratio 890:360 is ~2.47:1 -> 128x52 or 220x89
Resize-Bitmap -Bmp $croppedBmp -Width 220 -Height 89 -OutputPath "d:\DownloadsZee\veritech\src\assets\veritech_logo_header.png"

# 2. Full Lockup Footer Logo
Resize-Bitmap -Bmp $croppedBmp -Width 220 -Height 89 -OutputPath "d:\DownloadsZee\veritech\src\assets\veritech_logo_footer.png"

# 3. 500x500 Master Document / Letterhead Version (Centered on 500x500 canvas)
$canvas500 = New-Object System.Drawing.Bitmap(500, 500)
$g500 = [System.Drawing.Graphics]::FromImage($canvas500)
$g500.Clear([System.Drawing.Color]::FromArgb(255, 10, 19, 34)) # #0a1322 dark navy background
$g500.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g500.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g500.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

# Target size 460x186 centered
$g500.DrawImage($croppedBmp, 20, 157, 460, 186)
$g500.Dispose()
$canvas500.Save("d:\DownloadsZee\veritech\src\assets\veritech_logo_500x500.png", [System.Drawing.Imaging.ImageFormat]::Png)
$canvas500.Dispose()
Write-Host "Saved: d:\DownloadsZee\veritech\src\assets\veritech_logo_500x500.png (500 x 500)"

$croppedBmp.Dispose()
$img.Dispose()
