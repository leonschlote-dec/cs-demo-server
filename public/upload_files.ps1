$server = "raspberrypi.local"
$dir = "C:\Users\testo\Desktop\"
$user = ftpuser
$password = ftppass


$objFolder = CreateObject("Scripting.FileSystemObject")
$objFolder = objFSO.GetFolder($dir)

$filelist = objFolder.Files

echo $filelist


#"open $server
#user $user $password
#binary
#cd $dir
#
#" +
#($filelist.split(' ') | %{ "put ""$_""`n" }) | ftp -i -in
