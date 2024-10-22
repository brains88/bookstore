<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{

    public function run()
    {
        // Seed the database with some default categories
        Category::factory()->create(['name' => 'Romance']);
        Category::factory()->create(['name' => 'Art']);
        Category::factory()->create(['name' => 'Science Fiction']);
        Category::factory()->create(['name' => 'Fantasy']);
        Category::factory()->create(['name' => 'Biography']);
        Category::factory()->create(['name' => 'History']);
        Category::factory()->create(['name' => 'Mystery']);
    }

}
