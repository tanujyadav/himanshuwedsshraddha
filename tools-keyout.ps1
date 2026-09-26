param([string]$Src, [string]$Out)
Add-Type -AssemblyName System.Drawing

# NOTE: local variable names deliberately avoid $src/$out — PowerShell
# variables are case-insensitive, so a lowercase $src would be the SAME slot
# as the [string]-typed $Src parameter above, and any later assignment to it
# silently gets coerced back to a string (learned this the hard way: every
# GetPixel/SetPixel call below failed with "[System.String] does not contain
# a method named..." because $src had quietly become a string again).
$loadedImg = [System.Drawing.Image]::FromFile($Src)
$w = $loadedImg.Width; $h = $loadedImg.Height
$srcBmp = New-Object System.Drawing.Bitmap($loadedImg)
$loadedImg.Dispose()

$outBmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($outBmp)
$g.Clear([System.Drawing.Color]::Transparent)
$g.Dispose()

# Per-pixel: white -> transparent, gold/dark line art -> opaque, with a soft
# luma ramp between so edges anti-alias instead of going jagged.
$whiteFloor = 225   # this bright or brighter: fully transparent
$darkCeil   = 205   # this bright or darker: fully opaque

for ($y = 0; $y -lt $h; $y++) {
  for ($x = 0; $x -lt $w; $x++) {
    $p = $srcBmp.GetPixel($x, $y)
    $luma = 0.299*$p.R + 0.587*$p.G + 0.114*$p.B
    if ($luma -ge $whiteFloor) {
      $alpha = 0
    } elseif ($luma -le $darkCeil) {
      $alpha = 255
    } else {
      $alpha = [int](255 * (1 - (($luma - $darkCeil) / ($whiteFloor - $darkCeil))))
    }
    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
  }
}

$outBmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
$srcBmp.Dispose(); $outBmp.Dispose()
Write-Output "wrote $Out ($w x $h)"
