ALTER TABLE "users" ADD COLUMN "about_me" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture_1" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture_2" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture_3" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_picture_4" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "sms_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_notifications_enabled" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "sms_notifications_enabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "gender" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cuddle_preferences_male" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cuddle_preferences_female" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cuddle_preferences_non_binary" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cuddle_preferences_all_genders" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "hourly_rate" integer DEFAULT 60;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "maximum_travel_distance" text;