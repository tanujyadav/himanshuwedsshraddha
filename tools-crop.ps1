param(
  [string]$Src, [string]$Out,
  # Crop window as fractions of the original image (0..1).
  [double]$X0, [double]$X1, [double]$Y0, [double]$Y1,
  [int]$OutWidth = 1000, [int]$Quality = 80
)
Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile($Src)
$cx = [int]([Math]::Round($X0 * $img.Width))
$cy = [int]([Math]::Round($Y0 * $img.Height))
$cw = [int]([Math]::Round(($X1 - $X0) * $img.Width))
$ch = [int]([Math]::Round(($Y1 - $Y0) * $img.Height))

$nw = $OutWidth
$nh = [int]([Math]::Round($OutWidth * $ch / $cw))

$bmp = New-Object System.Drawing.Bitmap $nw, $nh
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$dest = New-Object System.Drawing.Rectangle 0, 0, $nw, $nh
$g.DrawImage($img, $dest, $cx, $cy, $cw, $ch, [System.Drawing.GraphicsUnit]::Pixel)

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([int]$Quality)
$bmp.Save($Out, $codec, $ep)

$g.Dispose(); $bmp.Dispose(); $img.Dispose()
$kb = [int]((Get-Item $Out).Length / 1KB)
Write-Output ("{0} -> {1}x{2} (aspect {3:N3})  {4} KB" -f (Split-Path $Out -Leaf), $nw, $nh, ($nw / $nh), $kb)
