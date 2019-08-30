export default class Deserialize
{
    static string(value, def, cb)
    {
        if (!cb)
        {
            cb = def;
            def = null;
        }
        if (value !== undefined)
        {
            return cb(value.toString());
        }
        return cb(def);
    }

    static number(value, def, cb)
    {
        if (!cb)
        {
            cb = def;
            def = null;
        }
        if (Number.isFinite(value))
        {
            return cb(value);
        }
        return cb(def);
    }

    static typeList(value, type, cb)
    {
        if (!(value instanceof Array))
        {
            return cb(null);
        }
        const items = [];
        for (const itemData of value)
        {
            const item = new type();
            if (item.deserialize(itemData))
            {
                items.push(item);
            }
        }
        return cb(items);
    }

    static typesList(value, types, cb, deserializeParams = [])
    {
        if (!(value instanceof Array))
        {
            return cb(null);
        }
        const items = [];
        for (const itemData of value)
        {
            const typeValue = itemData['ty'];
            const knownType = types[typeValue];
            if(!knownType)
            {
                console.warn("unhandled type", typeValue);
                continue;
            }
            const item = new knownType();
            if (item.deserialize(itemData))
            {
                items.push(item);
            }
        }
        return cb(items);
    }

    static type(value, type, cb)
    {
        const item = new type();
        if (item.deserialize(value))
        {
            return cb(item);
        } else 
        {
            return cb(null)
        }
    }
}