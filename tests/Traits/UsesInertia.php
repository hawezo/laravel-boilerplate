<?php

namespace Tests\Traits;

use DMS\PHPUnitExtensions\ArraySubset\Assert as ArraySubset;
use Illuminate\Foundation\Testing\TestResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use PHPUnit\Framework\Assert;

/**
 * @method TestResponse                  assertPropertyCount(string|array $key, int $count)
 * @method TestResponse                  assertPropertyHasValue(string|array $key, $value)
 * @method TestResponse                  assertHasProperty(string|array $keys)
 * @method TestResponse                  assertCurrentRouteIs(string $route)
 * @method Illuminate\Support\Collection properties(string|array $key = null)
 */
trait UsesInertia
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->registerInertiaMacro();
    }

    protected function registerInertiaMacro(): void
    {
        TestResponse::macro('properties', function ($key = null) {
            $props = json_decode(json_encode($this->original->getData()['page']['props']), JSON_OBJECT_AS_ARRAY);

            return $key ? Arr::get($props, $key) : $props;
        });

        TestResponse::macro('assertHasProperty', function ($key) {
            Assert::assertTrue(Arr::has($this->properties(), $key), "Property '$key' was not in the page.");

            return $this;
        });

        TestResponse::macro('assertPropertyHasValue', function ($key, $value) {
            $this->assertHasProperty($key);

            if (is_callable($value)) {
                $value($this->properties($key));
            } else {
                Assert::assertEquals($this->properties($key), $value, "Property '$key' does not have the value '$value'.");
            }

            return $this;
        });

        TestResponse::macro('assertPropertyHasJson', function ($key, $json, bool $strict = true) {
            $this->assertHasProperty($key);

            if (is_callable($json)) {
                $json($this->properties($key));
            } else {
                ArraySubset::assertArraySubset($json, $this->properties($key), $strict);
            }

            return $this;
        });

        TestResponse::macro('assertPropertyCount', function ($key, $count) {
            $this->assertHasProperty($key);
            Assert::assertCount($count, $c = $this->properties($key), "The page has $c properties, expected $count.");

            return $this;
        });

        TestResponse::macro('assertIsRoute', function ($route) {
            Assert::assertTrue($route === ($current = Route::currentRouteName()), "Expected current route to be '$route', found '$current' instead.");

            return $this;
        });
    }
}
