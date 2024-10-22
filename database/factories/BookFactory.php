<?php

namespace Database\Factories;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
// database/factories/BookFactory.php


class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'genre' => $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 5, 100),
            'image' => $this->faker->imageUrl(200, 300, 'books', true, 'Faker'),
            'category_id' => Category::inRandomOrder()->first()->id, // Use existing category ID
        ];
    }
}    

