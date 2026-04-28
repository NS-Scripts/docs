# Bridge mimarisi

`mr-bridge`, FiveM/RedM script'lerinin framework-bağımsız çalışmasını sağlayan bir abstraction layer.

## Neden Bridge?

Aynı script'i VORP, RSG-Core, ESX, QBCore'da çalıştırmak istediğinde her birinin API'si farklı:

| İşlem | VORP | RSG-Core | ESX |
|---|---|---|---|
| Para ekle | `Char.addCurrency(0, 100)` | `Player.Functions.AddMoney('cash', 100)` | `xPlayer.addMoney(100)` |
| Item ekle | `exports.vorp_inventory:addItem(src, 'item', 1)` | `Player.Functions.AddItem('item', 1)` | `xPlayer.addInventoryItem('item', 1)` |
| Player veri | `Core.getUser(src).getUsedCharacter` | `RSGCore.Functions.GetPlayer(src)` | `ESX.GetPlayerFromId(src)` |

Bridge bu farkları kapatır. Tüm scriptler `Bridge.AddMoney(src, 'cash', 100)` yazar ve hangi framework'ün çalıştığının önemi olmaz.

## Auto-detection

Resource start sırasında Bridge sırasıyla şu kaynakları kontrol eder:

```
framework: vorp_core → rsg-core → redemrp_base → es_extended → qb-core
inventory: ox_inventory → vorp_inventory → rsg-inventory → qb-inventory → redemrp_inventory
sql:       oxmysql → mysql-async
```

İlk eşleşen adapter'lar yüklenir. Eksik bağımlılık varsa Bridge fail-fast eder ve resource başlamaz.

## Adapter pattern

```
mr-bridge/adapters/
├── framework/      vorp.lua, rsg.lua, redemrp.lua, esx.lua, qbcore.lua
├── inventory/      ox.lua, vorp.lua, rsg.lua, qb.lua, esx.lua, redemrp.lua
└── sql/            oxmysql.lua, mysql-async.lua
```

Her adapter aynı interface'i implement eder. Bridge runtime'da hangi adapter'ı yükleyeceğine karar verir, `Bridge._fw / _inv / _db` slot'larına yerleştirir. Public API çağrıları (`Bridge.GetPlayer`, `Bridge.AddItem`, vb.) bu slot'lardan execute olur.

## Hibrit entegrasyon: `@-import` + `exports`

Dependent script `fxmanifest.lua`'da iki yol seçebilir:

### Hızlı yol — `@-import`

```lua
shared_scripts {
    '@mr-bridge/lib/init.lua',     -- Bridge global'i kurar
    -- ...
}
```

`Bridge.X(...)` direkt fonksiyon çağrısı olur, tight loop'larda hızlı.

### Cross-resource yol — `exports`

```lua
exports['mr-bridge']:AddItem(source, 'wine', 1)
```

Daha yavaşça (~10x msgpack overhead) ama bridge'i kullanmadığını sezdirmez.

## Server-only API

Aşağıdaki fonksiyonlar **sadece server-side** anlamlıdır. Client tarafından çağrılırsa açıklayıcı hata verir:

- `GetPlayer`, `GetMoney`, `AddMoney`, `RemoveMoney`
- `AddItem`, `RemoveItem`, `GetItemCount`, `GetInventory`, `RegisterUsableItem`, `CanCarry`
- `GetJob`, `SetJob`, `HasJob`
- `Query`, `QuerySingle`, `Scalar`, `Execute`, `Insert`

Client'ta ihtiyacın varsa server'a `TriggerServerEvent` ile sor, server Bridge ile karar versin.

## Client-side API

Client'tan güvenle çağrılabilenler:

- `Bridge.Notify(_, msg, type, duration)` — lokal bildirim göster
- `Bridge.OnPlayerLoaded`, `OnPlayerLogout`, `OnJobChange` — event subscribe
- `Bridge.framework`, `Bridge.inventory`, `Bridge.sql` — server'dan push edilmiş info

## Versioning

Bridge `Bridge.VERSION` ve `Bridge.RequireMinVersion(major)` sunar. Dependent script'ler API garantisi için minimum sürüm zorlayabilir:

```lua
Bridge.RequireMinVersion(1)
```

API breaking change yapılırsa major version bump eder, dependent'lar güncellemeyi bilir.

## /bridge-status

Test için admin komutu:

```
/bridge-status      detected framework / inventory / sql + adapter map
/bridge-test        kendi player'ında GetPlayer + Money + Job test
```
