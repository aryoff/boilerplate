<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoreUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('is_admin', ['false', 'true'])->default('false');
            $table->softDeletes('deleted_at', 0);
            if (env('DB_CONNECTION', false) == 'pgsql') {
                $table->jsonb('socialite')->nullable();
                $table->jsonb('additional_data')->nullable();
            } else {
                $table->json('socialite')->nullable();
                $table->json('additional_data')->nullable();
            }
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('core_users');
    }
}