# Genel bakış

**Mr-RedM-Scripts**, FiveM ve RedM (RDR3) sunucuları için cross-framework çalışan bir script ekosistemi. Hedef: tek kod tabanı VORP, RSG-Core, RedEM:RP, ESX ve QBCore'da değiştirmeden çalışsın.

## Çekirdek bileşen: `mr-bridge`

Her script `mr-bridge` resource'una bağımlıdır. Bridge başlangıçta hangi framework'ün, inventory sisteminin ve SQL driver'ının çalıştığını otomatik tespit eder ve uygun adapter'ı yükler. Script kodu sadece `Bridge.X(...)` çağrılarını kullanır:

```lua
Bridge.OnPlayerLoaded(function(source, player)
    -- player.identifier, .money.cash, .job.name — framework-bağımsız
end)

if Bridge.HasItem(source, 'shovel', 1) then
    Bridge.AddItem(source, 'grape', 5)
    Bridge.Notify(source, '5 üzüm topladın', 'success')
end
```

Hangi framework çalıştığının bilinmesi gerekmez.

## Sunucu kurulumu

1. Mr-RedM-Scripts org'undan istediğin script'i clone'la (her biri ayrı repo):
   ```bash
   cd resources
   git clone https://github.com/Mr-RedM-Scripts/mr-bridge.git
   git clone https://github.com/Mr-RedM-Scripts/redm-vineyard.git
   ```
2. `server.cfg`'ye **sırayla** ekle (mr-bridge önce):
   ```cfg
   ensure mr-bridge
   ensure redm-vineyard
   ```
3. Her script'in README'sindeki SQL ve item kayıtlarını uygula
4. Sunucuyu restart et — console'da:
   ```
   [mr-bridge] v1.0.0 initialized
   [mr-bridge] framework=vorp | inventory=vorp | sql=oxmysql
   [mr-bridge] adapters loaded ✓
   ```

## Sıradaki

- [Bridge mimarisi →](./bridge) — adapter pattern, API yüzeyi, runtime detection
- [Convention'lar →](./conventions) — kod stili, klasör yapısı, namespace mantığı
- [Scriptler →](/scripts/mr-bridge) — her script'in detaylı dokümantasyonu
