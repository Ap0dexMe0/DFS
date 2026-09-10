# DragonForceShell (DFS)

A feature-rich, object-oriented PHP webshell with cross-platform privilege escalation auditing, file management, database tools, and network scanning capabilities.

**Author:** Eagle Eye

- GitHub: <https://github.com/EagleTube>
- YouTube: <https://www.youtube.com/c/EagleTube1337>

Referred: ivan-sincek (reverse shell) | 0x5a455553 (PermChg)

## Disclaimer

This shell is intended for **study and authorized security testing purposes only**. Please do not use it to harm any site. Any damage done to a website using this tool is your own responsibility.

## Compatibility

- PHP 7 and above
- `allow_url_open` enabled

## Default Password

```
DF_Malaysia@1337$
```

## Features

- **Symlink** — Manual to Auto
- **Cpanel/WHM Brute-force**
- **MySQL Access**
- **OpenSSL Encryption**
- **Self Destruct**
- **Reverse Shell**
- **Command Terminal**
- **Mass Deface**
- **Disk Available**
- **Unzip / Zip**
- **Permission Code** — Chmod + Recursive
- **Mass Deletion** — Recursive
- **Network IP Scanner** — Local /24 TCP discovery (`?dfaction=netscan`)
- **Port Scanner** — Banner grab + service guess (`?dfaction=portscan`)
- **File Search** — Recursive keyword/extension search (`?dfaction=search`)
- **Copy / Move / File Info (MD5+SHA1) / PHPInfo**
- **Auto LPE** — Cross-platform privilege escalation audit (Linux + Windows)

  > **Linux:** SUID/SGID (GTFOBins), capabilities, kernel CVEs (DirtyPipe/PwnKit/DirtyCOW/etc.), writable passwd/shadow, sudo audit, Docker/LXC/K8s, cron, NFS, systemd services, Polkit
  >
  > **Windows:** Token privileges, unquoted service paths, writable service binaries, AlwaysInstallElevated, UAC bypass, autorun keys, scheduled tasks, kernel CVEs (PrintNightmare/HiveNightmare/etc.), stored credentials, DLL hijacking
  >
  > Each technique reports status (found/not_found/skipped) with a full evaluation log.

## Screenshots

**Windows example run:**
![Windows example](images/Screenshot_1.png)

**Directory listing:**
![Directory listing](images/Screenshot_2.png)

**File creation and upload area:**
![File creation area](images/Screenshot_3.png)

**MySQL database management:**
![MySQL management](images/Screenshot_4.png)

**Cpanel/WHM Brute-forcer:**
![Cpanel brute-force](images/Screenshot_5.png)

## Upcoming Features (V2.6)

- UDP scanning + service fingerprinting
- Ajax terminal + file editor with line numbers
- Additional kernel CVEs and Windows exploit modules
