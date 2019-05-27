$server = "raspberrypi.local"
$dir = "C:\Users\testo\Desktop"
$user = "ftpuser"
$password = "ftppass"


gci $path | select -expand FullName

cd $dir
$filelist = [string[]] (Get-ChildItem -Path $dir -File -Recurse)

echo $filelist


#"open $server
#user $user $password
#binary
#cd $dir
#
#" +
#($filelist.split(' ') | %{ "put ""$_""`n" }) | ftp -i -in
