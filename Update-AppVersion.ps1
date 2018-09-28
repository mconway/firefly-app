function Update-AppVersion
{
    $configFile = "config.xml"

    $buildNumber = $env:BUILD_BUILDNUMBER
    if($buildNumber -eq $null){
        $buildNumber = 0
    }

    $version = "0.0.0";
    $versionCode = (Get-Date).ToString("yyyyMM") + $buildNumber
    $matches = (Get-Content $configFile) | Select-String 'version="(\d+(\.\d+){1,3})"'
    
    if($matches){
        $version = $matches[0].Matches.Groups[1].Value
    }

    $versionPoints = $version.Split('.')
    $major = $versionPoints[0]
    $minor = $versionPoints[1]
    $patch = $versionPoints[2]

    $version = "$major.$minor.$patch.$buildNumber"

    Write-Verbose "Version $version" -Verbose
    Write-Verbose "VersionCode $versionCode" -Verbose

    (Get-Content $configFile) | 
        %{$_ -replace 'android-versionCode="\d+"', "android-versionCode=""$versionCode""" } | 
        %{$_ -replace 'version="\d+(\.\d+){1,3}"', "version=""$version""" } | 
        Set-Content $configFile -Force

    return $version
}

Update-AppVersion