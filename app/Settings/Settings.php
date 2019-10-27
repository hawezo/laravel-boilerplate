<?php

namespace App\Settings;

use ArrayAccess;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use JsonSerializable;

/**
 * A setting class.
 */
class Settings implements Arrayable, ArrayAccess, Jsonable, JsonSerializable
{
    /**
     * The model instance.
     *
     * @var Model
     */
    protected $model;

    /**
     * The list of settings.
     *
     * @var Collection
     */
    protected $settings;

    /**
     * Auto saves the settings.
     *
     * @var bool
     */
    protected $autoSave;

    /**
     * Create a new settings instance.
     *
     * @param array $settings
     * @param Model $model
     */
    public function __construct(Model $model, $settings = [], $autoSave = true)
    {
        $this->autoSave = $autoSave;
        $this->settings = Collection::make($settings);
        $this->model    = $model;
    }

    /**
     * Defines if the settings will auto-save on change.
     *
     * @param bool $autoSave
     *
     * @return $this
     */
    public function autosave(bool $autoSave = true)
    {
        $this->autoSave = $autoSave;

        return $this;
    }

    /**
     * Retrieve the given setting.
     *
     * @param string|array|int $key
     * @param mixed            $default
     *
     * @return mixed
     */
    public function get($key, $default = null)
    {
        return $this->settings->get($key, $default);
    }

    /**
     * Create and save a new setting.
     *
     * @param string|array|int $key
     * @param mixed            $value
     *
     * @return $this
     */
    public function set($key, $value)
    {
        $this->settings->put($key, $value);
        $this->save();

        return $this;
    }

    /**
     * Forget the given key usint dot notation.
     *
     * @param array|string $keys
     *
     * @return $this
     */
    public function forget($keys)
    {
        $this->settings->forget($keys);
        $this->save();

        return $this;
    }

    /**
     * Merge the given attributes with the current settings.
     *
     * @param array $attributes
     *
     * @return $this
     */
    public function merge(array $attributes)
    {
        $this->settings->merge($attributes);
        $this->save();

        return $this;
    }

    /**
     * Determine if the given setting exists.
     *
     * @param string $key
     *
     * @return bool
     */
    public function has($key)
    {
        return $this->settings->has($key);
    }

    /**
     * Retrieve an array of all settings.
     *
     * @return array
     */
    public function all()
    {
        return $this->settings->all();
    }

    /**
     * Persist the settings.
     *
     * @return mixed
     */
    public function persist()
    {
        return $this->model->update(['settings' => $this->settings->toArray()]);
    }

    /**
     * Saves the settings if autosave is enabled.
     *
     * @return $this
     */
    private function save()
    {
        if ($this->autoSave) {
            $this->persist();
        }

        return $this;
    }

    /**
     * Magic property access for settings.
     *
     * @param string $key
     *
     * @throws \Exception
     *
     * @return mixed
     */
    public function __get($key)
    {
        if ($this->has($key)) {
            return $this->get($key);
        }

        throw new \Exception("The {$key} setting does not exist.");
    }

    /**
     * Get a Settings instance for the given model.
     *
     * @param Model $model
     * @param array $settings
     *
     * @return static
     */
    public static function link($model, $settings = [])
    {
        if (!$model instanceof Model) {
            throw new \Exception('First parameter must be an instance of Model.');
        }

        return new static($model, $settings);
    }

    /**
     * Convert the settings instance to an array.
     *
     * @return array
     */
    public function toArray()
    {
        return $this->settings->toArray();
    }

    /**
     * Convert the settings instance to JSON.
     *
     * @param int $options
     *
     * @return string
     *
     * @throws \Illuminate\Database\Eloquent\JsonEncodingException
     */
    public function toJson($options = 0)
    {
        return $this->settings->toJson($options);
    }

    /**
     * Convert the object into something JSON serializable.
     *
     * @return array
     */
    public function jsonSerialize()
    {
        return $this->toArray();
    }

    /**
     * Determine if the given attribute exists.
     *
     * @param mixed $offset
     *
     * @return bool
     */
    public function offsetExists($offset)
    {
        return $this->settings->offsetExists($offset);
    }

    /**
     * Get the value for a given offset.
     *
     * @param mixed $offset
     *
     * @return mixed
     */
    public function offsetGet($offset)
    {
        return $this->settings->offsetGet($offset);
    }

    /**
     * Set the value for a given offset.
     *
     * @param mixed $offset
     * @param mixed $value
     */
    public function offsetSet($offset, $value)
    {
        return $this->settings->offsetSet($offset, $value);
    }

    /**
     * Unset the value for a given offset.
     *
     * @param mixed $offset
     */
    public function offsetUnset($offset)
    {
        return $this->settings->offsetUnset($offset);
    }
}
