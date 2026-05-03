---
title: NS-Development
---

# NS-Development

FiveM ve RedM (RDR3) sunucuları için cross-framework çalışan, modüler, üretime hazır script ekosistemi. Tek kod tabanı **VORP, RSG-Core, RedEM:RP, ESX ve QBCore**'da değiştirilmeden çalışır.

> **🔗 Çekirdek:** Her script `ns-lib` üzerinden framework'e bağlanır. Hangi framework'ün yüklü olduğunu bilmesi gerekmez — `NSLib.X(...)` çağrıları runtime'da doğru adapter'a yönlenir.

## Hızlı başlangıç

```bash
cd resources
git clone https://github.com/NS-Developments/ns-lib.git
git clone https://github.com/NS-Developments/ns-kits.git
```

```cfg
ensure ns-lib
ensure ns-kits
```

Detaylı kurulum: [Genel bakış](/guide/getting-started)

## Scriptler

### Altyapı

- **[ns-lib](/scripts/ns-lib)** — Cross-framework abstraction layer. VORP/RSG/RedEM/ESX/QB için tek API; oxmysql/mysql-async; Discord, permissions, teleport, blip & ped helperları.

### Resource'lar

- **[ns-kits](/scripts/ns-kits)** — Western temalı kit menüsü. 10 kit: starter / daily / weekly + Discord rol bazlı (member, streamer, booster) + 4 donator tier (vip, gold, premium, diamond).
- **[ns-vineyard](/scripts/ns-vineyard)** — 3×3 bağ tarlası, üzüm yetiştirme, pres makinesi, fıçılı şarap dinlendirme (kalite 1-5).

## Standartlar

Tüm scriptler aynı klasör yapısı, naming convention, module pattern ve config formatına uyar — bir script okunduğunda diğeri de tanıdık gelir. Detay: [Convention'lar](/guide/conventions).

## Topluluk

- **GitHub:** [NS-Developments](https://github.com/NS-Developments)
- **Discord:** [discord.gg/UyyngemnF8](https://discord.gg/UyyngemnF8) — bug raporu, özellik talebi, sunucu daveti
