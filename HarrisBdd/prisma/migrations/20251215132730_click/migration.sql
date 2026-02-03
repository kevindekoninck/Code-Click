-- CreateTable
CREATE TABLE "User" (
    "etna_id" INTEGER NOT NULL,
    "lava_coins" BIGINT NOT NULL,
    "student_type" TEXT NOT NULL,
    "current_clicks" BIGINT NOT NULL,
    "team_name" TEXT NOT NULL,
    "fairplay_points" BIGINT NOT NULL,
    "battery_level" DOUBLE PRECISION NOT NULL,
    "logged_in" BOOLEAN NOT NULL,
    "user_token" TEXT NOT NULL,
    "token_expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("etna_id")
);

-- CreateTable
CREATE TABLE "PowerUp" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "base_price" BIGINT NOT NULL,
    "base_cps_multiplier" DOUBLE PRECISION NOT NULL,
    "base_cps_diviser" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "pu_pictures" TEXT NOT NULL,

    CONSTRAINT "PowerUp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPowerUp" (
    "user_id" INTEGER NOT NULL,
    "power_up_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "next_price" BIGINT NOT NULL,
    "current_cps_multiplier" DOUBLE PRECISION NOT NULL,
    "current_cps_diviser" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserPowerUp_pkey" PRIMARY KEY ("user_id","power_up_id")
);

-- CreateTable
CREATE TABLE "Consumable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" BIGINT NOT NULL,
    "effect_duration_s" INTEGER NOT NULL,
    "effect_multiplier" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Consumable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserConsumable" (
    "user_id" INTEGER NOT NULL,
    "consumable_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserConsumable_pkey" PRIMARY KEY ("user_id","consumable_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classement" (
    "event_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "reward_details" TEXT,

    CONSTRAINT "Classement_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "UserScore" (
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "score" BIGINT NOT NULL DEFAULT 0,
    "last_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserScore_pkey" PRIMARY KEY ("user_id","event_id")
);

-- CreateTable
CREATE TABLE "Boss" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "max_hp" BIGINT NOT NULL,
    "current_hp" BIGINT NOT NULL,
    "is_defeated" BOOLEAN NOT NULL DEFAULT false,
    "damage_reward" BIGINT NOT NULL,

    CONSTRAINT "Boss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward_points" INTEGER NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "user_id" INTEGER NOT NULL,
    "achievement_id" INTEGER NOT NULL,
    "unlocked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("user_id","achievement_id")
);

-- CreateTable
CREATE TABLE "SkillTreePoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cost" BIGINT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "SkillTreePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prerequisite" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "reward_fairplay_points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuizResult" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "is_penalized" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserQuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_token_key" ON "User"("user_token");

-- AddForeignKey
ALTER TABLE "UserPowerUp" ADD CONSTRAINT "UserPowerUp_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("etna_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPowerUp" ADD CONSTRAINT "UserPowerUp_power_up_id_fkey" FOREIGN KEY ("power_up_id") REFERENCES "PowerUp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsumable" ADD CONSTRAINT "UserConsumable_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("etna_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserConsumable" ADD CONSTRAINT "UserConsumable_consumable_id_fkey" FOREIGN KEY ("consumable_id") REFERENCES "Consumable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classement" ADD CONSTRAINT "Classement_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("etna_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("etna_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizResult" ADD CONSTRAINT "UserQuizResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("etna_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuizResult" ADD CONSTRAINT "UserQuizResult_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
