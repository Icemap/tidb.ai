'use client';

import React, { useState } from 'react';
import type { AllSettings } from '@/api/site-settings';
import { LinkArrayField } from '@/components/settings/LinkArrayField';
import { SettingsField } from '@/components/settings/SettingsField';
import { StringArrayField } from '@/components/settings/StringArrayField';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { createAPIKey } from '@/api/auth';

export function WebsiteSettings ({ schema }: { schema: AllSettings }) {
  const [stateVariable, setStateVariable] = useState({apiKey: ''});

  return (
    <div className="space-y-8 max-w-screen-md">
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Basic Settings</h2>
        <SettingsField name="title" item={schema.title} />
        <SettingsField name="description" item={schema.description} />
        <SettingsField name="logo_in_dark_mode" item={schema.logo_in_dark_mode} />
        <SettingsField name="logo_in_light_mode" item={schema.logo_in_light_mode} />
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Homepage Settings</h2>
        <SettingsField name="homepage_title" item={schema.homepage_title} />
        <SettingsField name="homepage_example_questions" item={schema.homepage_example_questions} arrayItemSchema={z.string()}>
          {props => <StringArrayField {...props} />}
        </SettingsField>
        <SettingsField name="homepage_footer_links" item={schema.homepage_footer_links} arrayItemSchema={z.object({ text: z.string(), href: z.string() })}>
          {props => <LinkArrayField {...props} />}
        </SettingsField>
      </section>
      <Separator />
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Social links</h2>
        <SettingsField name="social_github" item={schema.social_github} />
        <SettingsField name="social_twitter" item={schema.social_twitter} />
        <SettingsField name="social_discord" item={schema.social_discord} />
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Analytics</h2>
        <SettingsField name="ga_id" item={schema.ga_id} />
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-medium">API Key</h2>
        <Button
          className="g-recaptcha font-normal text-xs"
          variant="secondary"
          size="sm"
          onClick={async () => {
            const apiKeyResult = await createAPIKey();
            setStateVariable({apiKey: apiKeyResult.api_key});
          }}
        >
          Generate an API Key
        </Button>
        {stateVariable.apiKey !== '' && <div> API Key will only appear once, please save it carefully: {stateVariable.apiKey}</div>}
      </section>
    </div>
  );
}