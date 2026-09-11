# Changelog

## DFS V2.6

- Port scanner now does UDP too (TCP/UDP/Both selector) + service fingerprinting (active probes for HTTP/FTP/SMTP/Redis etc)
- Command terminal got ajax mode — runs without page reload, up/down history, classic form kept as fallback
- File editor now has line numbers, Ln/Col + char count, Tab inserts 4 spaces
- File editor fix: gutter was losing sync on long files (showed wrong numbers / blank area) — rewritten with transform-based sync + matching line metrics, styles moved to dfs.css so the old textarea rule stops overriding it
- File editor form fix: refuses to open missing/unreadable files (Save used to create a stray file there), save errors now show a popup instead of a warning, added Cancel button back to view, Ctrl+S to save, unsaved-changes warning, header + file size + read-only badge matching the other pages
- File editor overhaul: fixed flex blowout on long lines (textarea min-width:0, gutter can't shrink), Tab indents whole selected lines / Shift+Tab unindents / Enter mirrors indent, IME-safe, Ctrl+S + Save button now save via ajax with no reload and no cursor loss (classic submit kept as fallback), empty/unicode files load reliably, read failures go to the error popup
- Linux LPE: new CVEs (Looney Tunables CVE-2023-4911, runc escape CVE-2024-21626, io_uring CVE-2024-0582) + new container escape module (runc version, docker socket, privileged flags)
- Windows LPE: new CVEs (CLFS CVE-2023-28252, Win32k CVE-2024-30090, AFD CVE-2025-21418) + new Potato advisor (picks GodPotato/JuicyPotatoNG/RoguePotato per build) + vulnerable driver check (BYOVD via loldrivers list)
- Version bump everywhere (2.5 -> 2.6)

## DFS V2.5 — Cross-Platform Auto LPE

- FULL REWRITE of Auto LPE — now works on both Linux AND Windows
- Auto OS detection (Linux/Windows) with arch and kernel/build info
- Modular technique architecture — each LPE check is self-contained and extensible
- Evaluation log showing what was checked, found, skipped, and why
- Findings sorted by severity (critical → high → medium → info)
- Removed "New version available" popup notification

Linux techniques (12 modules):
- SUID/SGID binary enum with GTFOBins cross-ref
- Linux capabilities scan (getcap) with dangerous cap detection
- Kernel CVE detection: DirtyPipe, PwnKit, DirtyCOW, Baron Samedit, OverlayFS, StackRot, DirtyCred, GameOver(lay), nf_tables, vsock
- /etc/passwd writable check, /etc/shadow readable check with hash extraction
- Sudo config audit (NOPASSWD, ALL, dangerous cmds → GTFOBins)
- Writable system paths (cron, systemd, ld.so.preload, environment)
- Docker/LXC/K8s container detection with privileged container escape vectors
- Cron job enum with writable cron detection
- NFS no_root_squash export detection
- Writable systemd service files
- PATH/LD_PRELOAD injection vectors
- Polkit (PwnKit) vulnerability detection

Windows techniques (10 modules):
- Token privilege enum (SeImpersonate, SeDebug, SeBackup, SeRestore, etc.)
- Unquoted service path detection
- Writable service binary detection with ACL analysis
- AlwaysInstallElevated registry check (HKCU + HKLM)
- UAC bypass opportunity detection
- Registry autorun key writability check
- Writable scheduled task binary detection
- Windows kernel CVE detection: PrintNightmare, HiveNightmare, SMBGhost, Win32k, AFD.sys, CVE-2024-30088, CVE-2025-24989
- Stored credential detection (AutoLogon, GPP, Credential Manager, PS history)
- DLL hijacking via writable PATH directories

## DFS V2.4

- Auto LPE (Local Privilege Escalation) audit
  - SUID/SGID file enumeration
  - Linux capabilities scan (getcap)
  - Writable system paths detection
  - /etc/passwd & /etc/shadow access check with hash extraction
  - Docker socket detection
  - Sudo access enumeration
  - Container detection (/.dockerenv, cgroup)
  - Cron job enumeration
  - Kernel version detection with known exploit references
  - Auto summary of all findings
- New nav item: Auto LPE with shield icon

## DFS V2.3

- NEW: Local network IP scanner (?dfaction=netscan, /24 TCP discovery, auto-detect base)
- NEW: Port scanner (?dfaction=portscan, ranges like 1-1000, banner grab + service guess)
- NEW: File search (?dfaction=search, recursive keyword/ext, 500-result cap)
- NEW: Copy/Move (?dfaction=copy/move) + File info (?dfaction=info) + PHPInfo (?dfaction=phpinfo)
- IMPROVE: Recursive delete/chmod (fixes rmdir failing on non-empty dirs), basename-safe mkdir/mkfile/rename/mass
- IMPROVE: Command terminal shows cwd + active executor, escaped output, autofocus
- IMPROVE: Offline-safe templates (local fallback if GitHub unreachable), 3-4s fetch timeouts
- IMPROVE: Responsive CSS + scantable/fileinfo styles, new nav items NetScan/PortScan/Search/PHPInfo
- SECURITY: htmlspecialchars on filenames/paths/cmd/crack/mail, escapeshellarg on symlink ln -s, ZipSlip block, __FILE__ self-destruct fix, email validation + header-injection strip

## DFS V2.2

- Email bombing feature
- Fixing missing delete function
- Symlink: manually convert target path string to base64 before submit
- Symlink base64 insert (bypass detection)
- Update notifier

## DFS V2.1

- Command error fixed
- Symlink error fixed
- Database command fixed
- Owner/Group recode
- Add mass deletion
- Add unzip function
- Add drop DB/TB function

## DFS V2.0

- Zip support
- Chmod support
- Better mass deface
- Command error fixed

## DFS V1.3

- Linux early directory fix

## DFS V1.2

- Directory error patch
- Scan ini_get and filter

## DFS V1.1

- Fixing path traversal error in Linux platform
- Modified slash function for different platforms
- URL encode from login