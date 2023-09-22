"use client";

import React, { useState } from "react";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";
import Button from "./Button";
import Inputs from "./Inputs";
import toast from "react-hot-toast";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { reset, handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    try {
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Please fill required field,");
        return;
      }

      const uniqueID = uniqid();

      // Upload Song
      const {
        data: songData,
        error: songError,
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (songError) {
        setIsLoading(false);
        toast.error("Failed to upload song.")
        return;
      }

      // Upload Image
      const {
        data: imageData,
        error: imageError,
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (imageError) {
        setIsLoading(false);
        toast.error("Failed to upload image.")
        return;
      }

      const {
        error: supabaseError
      } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path
        })
      
      if (supabaseError) {
        setIsLoading(false);
        toast.error(supabaseError.message)
        return;
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully!")
      onClose();
      reset();

    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Song"
      description="Upload a mp3 file"
      onChange={onChange}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Inputs
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Inputs
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <p>Select a song</p>
          <Inputs
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <p>Select an image</p>
          <Inputs
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button className="mt-2" disabled={isLoading} type={"submit"}>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
