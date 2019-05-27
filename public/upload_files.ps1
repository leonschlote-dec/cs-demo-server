$server = "raspberrypi.local"
$dir = "C:\Users\testo\Desktop\*.*"
$user = "ftpuser"
$password = "ftppass"


#gci $path | select -expand FullName

$filelist = [string[]] (Get-ChildItem -Path $dir -Recurse)

echo $filelist


"open $server
user $user $password
binary

" +
($filelist | %{ "put ""$_""`n" }) | ftp -i -in
