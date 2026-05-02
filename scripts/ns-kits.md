# ns-kits

Western (RDR2) styled kit menu for RedM. Players open the menu with the `/kit` chat command and claim from one of six kit categories.

> **Support / Community:** [discord.gg/UyyngemnF8](https://discord.gg/UyyngemnF8) — bug reports, feature requests, server invite.

## Kits

| ID | Audience | Cooldown | Description |
|---|---|---|---|
| `starter` | everyone | **once per character** | New character starter pack |
| `daily` | everyone | 24 hours | Daily provisions |
| `weekly` | everyone | 7 days | Weekly stockpile |
| `discord` | Discord member role | 7 days | Reward for verified Discord members |
| `streamer` | Discord streamer role | 7 days | Reward for approved content creators |
| `booster` | Discord booster role | 7 days | Reward for Discord Server Boosters |

## Adding / removing kits

Open **`config.lua`** and edit the `Config.Kits = { ... }` table at the bottom. The block right above that table has a copy-paste template, a field reference, and notes on how to remove a kit cleanly. After editing, run `restart ns-kits` in-game — no build step required.

## Running on RSG / QBCore / ESX / RedEM:RP

ns-lib auto-detects the framework, so `NSLib.AddItem`, `NSLib.AddMoney`, etc. are framework-agnostic. The only thing that varies between servers is **item key names**.

The kits ship with VORP item keys (e.g. `ammorevolvernormal`, `consumable_peach`). On a different framework, just edit each kit's `items[*].name` in `config.lua` to your real item keys. Look them up in:

- **RSG:** `rsg-core/shared/items.lua`
- **QBCore:** `qb-core/shared/items.lua`
- **ESX:** `SELECT name FROM items;`
- **RedEM:RP:** `SELECT item FROM items;`

## Dependencies

- **ns-lib** (required) — `ensure ns-lib` must come **before** `ns-kits` in `server.cfg`
- **VORP / RSG-Core / RedEM:RP / ESX / QBCore** — NSLib auto-detects whichever is running
- **oxmysql** or **mysql-async** — for cooldown persistence

## Installation

1. Make sure `ns-lib` is installed and `ensure`d.
2. Drop this folder into `resources/ns-kits/`.
3. Update `server.cfg`:
   ```
   ensure ns-lib
   ensure ns-kits
   ```
4. **For Discord-gated kits**, fill in the `Config.Discord` block in `config.lua`:
   - `BotToken`, `GuildId`, `Roles.member`, `Roles.booster`
   - Set `Enabled = true`
5. **Replace placeholder item names** — search `config.lua` for `TODO` comments and map them to your VORP item database.

## Discord bot setup

1. https://discord.com/developers/applications → New Application → Bot → Reset Token (copy it)
2. OAuth2 → URL Generator → scope `bot`, permission `Read Messages` → open the URL → invite the bot to your server
3. Enable Developer Mode in your Discord client settings
4. Right-click your server → Copy Server ID → paste into `Config.Discord.GuildId`
5. Server Settings → Roles → right-click each role → Copy Role ID → paste into `Config.Discord.Roles.member` and `Config.Discord.Roles.booster`

## Testing

```
/kit
```

The command name can be changed via `Config.OpenCommand` in `config.lua`.

## Database

The `ns_kits_claims` table is created automatically on first start. Manual reset queries:

```sql
TRUNCATE ns_kits_claims;                                    -- reset all cooldowns
DELETE FROM ns_kits_claims WHERE char_id = 'CHAR_ID';       -- reset a single character
DELETE FROM ns_kits_claims WHERE kit_id = 'starter';        -- let everyone claim starter again
```

## Cross-resource API

ns-lib already exposes a cross-resource API. `ns-kits` does not export its own surface — if another script needs to grant a kit, call `NSLib.AddItem` / `NSLib.AddMoney` directly.

## NUI / frontend

The menu is built with React 18. **No CDN dependencies** — React, ReactDOM and the fonts (Rye / Crimson Text / JetBrains Mono) are all bundled locally under `html/vendor/` and `html/fonts/`. The menu fully renders even on offline servers.

For build steps and customization (icons, colors, layout), see **[html/README.md](html/README.md)**.

## License

MIT
