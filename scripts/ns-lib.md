# ns-lib

Cross-framework abstraction layer for FiveM and RedM resources.

Supports **VORP**, **RSG-Core**, **RedEM:RP**, **ESX**, **QBCore** with auto-detection.
SQL backends: **oxmysql**, **mysql-async**.
Notify backends: **ox_lib** (preferred) → framework native → game native (fallback chain).

## Installation

1. Clone or download this repo into your `resources/` folder.
2. `ensure ns-lib` in `server.cfg` **before** any dependent script.
3. Restart the server. Console will print:
   ```
   [ns-lib] v1.0.0 initialized
   [ns-lib] framework=rsg | inventory=ox | sql=oxmysql
   [ns-lib] adapters loaded ✓
   ```

## Using ns-lib in your scripts

In your script's `fxmanifest.lua`:

```lua
dependency 'ns-lib'

shared_scripts {
    '@ns-lib/lib/init.lua',
    'config.lua',
    'shared/*.lua',
}

client_scripts { 'client/*.lua' }
server_scripts { 'server/*.lua' }
```

In your code, use the unified `Bridge` API. No framework-specific code needed.

```lua
-- server/main.lua
NSLib.OnPlayerLoaded(function(source, player)
    print(('Player loaded: %s (%s)'):format(player.name, player.identifier))
end)

function GiveWine(source, quality)
    if not NSLib.HasItem(source, 'empty_bottle', 1) then
        return NSLib.Notify(source, 'Boş şişe lazım', 'error')
    end
    NSLib.RemoveItem(source, 'empty_bottle', 1)
    NSLib.AddItem(source, 'wine', 1, { quality = quality })
    NSLib.Notify(source, 'Şarap üretildi', 'success')
end
```

## API

### Player

```lua
NSLib.GetPlayer(source)       -- → Player | nil
NSLib.GetIdentifier(source)   -- → string | nil
NSLib.GetAllPlayers()         -- → Player[]
NSLib.IsLoaded(source)        -- → bool
```

### Money — types: `'cash'`, `'bank'`, `'gold'`, `'rol'`

```lua
NSLib.GetMoney(source, type)
NSLib.AddMoney(source, type, amount)
NSLib.RemoveMoney(source, type, amount)
```

### Inventory

```lua
NSLib.AddItem(source, name, count, metadata?)
NSLib.RemoveItem(source, name, count, metadata?)
NSLib.GetItemCount(source, name)
NSLib.HasItem(source, name, count?)
NSLib.GetInventory(source)
NSLib.RegisterUsableItem(name, callback)
NSLib.CanCarry(source, name, count)
```

### Job

```lua
NSLib.GetJob(source)                  -- → { name, grade, label }
NSLib.SetJob(source, name, grade)
NSLib.HasJob(source, name, minGrade?)
```

### Database (hybrid sync/async)

```lua
-- Sync (no callback)
local rows = NSLib.Query('SELECT * FROM players WHERE id = ?', { id })

-- Async (callback)
NSLib.Query('SELECT * FROM players', {}, function(rows)
    print(#rows)
end)

NSLib.QuerySingle(sql, params, cb?)  -- single row
NSLib.Scalar(sql, params, cb?)       -- first column of first row
NSLib.Execute(sql, params, cb?)      -- affected rows
NSLib.Insert(sql, params, cb?)       -- insertId
```

### Notify — types: `'success'`, `'error'`, `'info'`, `'warning'`

```lua
NSLib.Notify(source, message, type, duration?)
```

### Events

```lua
NSLib.OnPlayerLoaded(function(source, player) ... end)
NSLib.OnPlayerLogout(function(source) ... end)
NSLib.OnJobChange(function(source, newJob) ... end)
```

## Standalone fallback

There is **no standalone fallback**. ns-lib requires one of the supported frameworks to be running. If no framework is detected at startup, the resource will error out and stop.

## Hot reload

Restarting `ns-lib` invalidates `Bridge` references in dependent scripts. **Restart all dependent scripts** after restarting ns-lib.

## Items

ns-lib does **not** auto-register items. Each dependent script's README lists the items it requires. You must manually add them to your framework's item database (`ox_inventory/data/items.lua`, `vorp_inventory` SQL, `qb-core/shared/items.lua`, etc).

## Admin

```
/bridge-status   -- print detected framework/inventory/sql, list mounted adapters
```

## Versioning

```lua
NSLib.RequireMinVersion(1)  -- in your script's init code
```

## License

MIT
