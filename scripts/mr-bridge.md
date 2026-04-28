# mr-bridge

Cross-framework abstraction layer for FiveM and RedM resources.

Supports **VORP**, **RSG-Core**, **RedEM:RP**, **ESX**, **QBCore** with auto-detection.
SQL backends: **oxmysql**, **mysql-async**.
Notify backends: **ox_lib** (preferred) → framework native → game native (fallback chain).

## Installation

1. Clone or download this repo into your `resources/` folder.
2. `ensure mr-bridge` in `server.cfg` **before** any dependent script.
3. Restart the server. Console will print:
   ```
   [mr-bridge] v1.0.0 initialized
   [mr-bridge] framework=rsg | inventory=ox | sql=oxmysql
   [mr-bridge] adapters loaded ✓
   ```

## Using mr-bridge in your scripts

In your script's `fxmanifest.lua`:

```lua
dependency 'mr-bridge'

shared_scripts {
    '@mr-bridge/lib/init.lua',
    'config.lua',
    'shared/*.lua',
}

client_scripts { 'client/*.lua' }
server_scripts { 'server/*.lua' }
```

In your code, use the unified `Bridge` API. No framework-specific code needed.

```lua
-- server/main.lua
Bridge.OnPlayerLoaded(function(source, player)
    print(('Player loaded: %s (%s)'):format(player.name, player.identifier))
end)

function GiveWine(source, quality)
    if not Bridge.HasItem(source, 'empty_bottle', 1) then
        return Bridge.Notify(source, 'Boş şişe lazım', 'error')
    end
    Bridge.RemoveItem(source, 'empty_bottle', 1)
    Bridge.AddItem(source, 'wine', 1, { quality = quality })
    Bridge.Notify(source, 'Şarap üretildi', 'success')
end
```

## API

### Player

```lua
Bridge.GetPlayer(source)       -- → Player | nil
Bridge.GetIdentifier(source)   -- → string | nil
Bridge.GetAllPlayers()         -- → Player[]
Bridge.IsLoaded(source)        -- → bool
```

### Money — types: `'cash'`, `'bank'`, `'gold'`, `'rol'`

```lua
Bridge.GetMoney(source, type)
Bridge.AddMoney(source, type, amount)
Bridge.RemoveMoney(source, type, amount)
```

### Inventory

```lua
Bridge.AddItem(source, name, count, metadata?)
Bridge.RemoveItem(source, name, count, metadata?)
Bridge.GetItemCount(source, name)
Bridge.HasItem(source, name, count?)
Bridge.GetInventory(source)
Bridge.RegisterUsableItem(name, callback)
Bridge.CanCarry(source, name, count)
```

### Job

```lua
Bridge.GetJob(source)                  -- → { name, grade, label }
Bridge.SetJob(source, name, grade)
Bridge.HasJob(source, name, minGrade?)
```

### Database (hybrid sync/async)

```lua
-- Sync (no callback)
local rows = Bridge.Query('SELECT * FROM players WHERE id = ?', { id })

-- Async (callback)
Bridge.Query('SELECT * FROM players', {}, function(rows)
    print(#rows)
end)

Bridge.QuerySingle(sql, params, cb?)  -- single row
Bridge.Scalar(sql, params, cb?)       -- first column of first row
Bridge.Execute(sql, params, cb?)      -- affected rows
Bridge.Insert(sql, params, cb?)       -- insertId
```

### Notify — types: `'success'`, `'error'`, `'info'`, `'warning'`

```lua
Bridge.Notify(source, message, type, duration?)
```

### Events

```lua
Bridge.OnPlayerLoaded(function(source, player) ... end)
Bridge.OnPlayerLogout(function(source) ... end)
Bridge.OnJobChange(function(source, newJob) ... end)
```

## Standalone fallback

There is **no standalone fallback**. mr-bridge requires one of the supported frameworks to be running. If no framework is detected at startup, the resource will error out and stop.

## Hot reload

Restarting `mr-bridge` invalidates `Bridge` references in dependent scripts. **Restart all dependent scripts** after restarting mr-bridge.

## Items

mr-bridge does **not** auto-register items. Each dependent script's README lists the items it requires. You must manually add them to your framework's item database (`ox_inventory/data/items.lua`, `vorp_inventory` SQL, `qb-core/shared/items.lua`, etc).

## Admin

```
/bridge-status   -- print detected framework/inventory/sql, list mounted adapters
```

## Versioning

```lua
Bridge.RequireMinVersion(1)  -- in your script's init code
```

## License

MIT
