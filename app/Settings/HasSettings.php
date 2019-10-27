<?php

namespace App\Settings;

trait HasSettings
{
    /**
     * Get the casts array.
     *
     * @return array
     */
    public function getCasts()
    {
        $this->casts = array_merge($this->casts, ['settings' => 'array']);

        return parent::getCasts();
    }

    /**
     * Get the fillable attributes for the model.
     *
     * @return array
     */
    public function getFillable()
    {
        $this->fillable[] = 'settings';

        return parent::getFillable();
    }

    /**
     * Gets the settings.
     *
     * @return Settings
     */
    public function settings()
    {
        return Settings::link($this, $this->settings);
    }
}
