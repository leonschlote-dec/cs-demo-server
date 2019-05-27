$server = "raspberrypi.local"
$dir = "C:\Users\testo\Desktop\"
$user = "ftpuser"
$password = "ftppass"


$filelist = Get-ChildItem -Path $dir

echo $filelist


#"open $server
#user $user $password
#binary
#cd $dir
#
#" +
#($filelist.split(' ') | %{ "put ""$_""`n" }) | ftp -i -in
