param(
  [string]$CommitMessagePrefix = "chore: auto update",
  [int]$StableSeconds = 3,
  [int]$PollSeconds = 2
)

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

Write-Host "Watching $repoRoot for changes. Press Ctrl+C to stop."

$lastDirtySnapshot = $null
$lastChangeAt = $null

function Get-GitStatus {
  git status --porcelain
}

while ($true) {
  $status = @(Get-GitStatus)

  if ($status.Count -gt 0) {
    $snapshot = $status -join "`n"
    if ($snapshot -ne $lastDirtySnapshot) {
      $lastDirtySnapshot = $snapshot
      $lastChangeAt = Get-Date
    }

    if ($lastChangeAt -and ((Get-Date) - $lastChangeAt).TotalSeconds -ge $StableSeconds) {
      git add -A

      $commitOutput = git commit -m ("{0} {1}" -f $CommitMessagePrefix, (Get-Date -Format "yyyy-MM-dd HH:mm:ss")) 2>&1
      $commitCode = $LASTEXITCODE

      if ($commitCode -eq 0) {
        Write-Host $commitOutput
        git push origin main
        if ($LASTEXITCODE -eq 0) {
          Write-Host "Pushed changes to origin/main."
        } else {
          Write-Warning "Commit succeeded but push failed."
        }
      } elseif ($commitOutput -match "nothing to commit") {
        Write-Host "No commit needed."
      } else {
        Write-Warning $commitOutput
      }

      $lastDirtySnapshot = $null
      $lastChangeAt = $null
    }
  } else {
    $lastDirtySnapshot = $null
    $lastChangeAt = $null
  }

  Start-Sleep -Seconds $PollSeconds
}
