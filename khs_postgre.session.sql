          SELECT 
          a.slug, 
          COUNT(DISTINCT h.user_account_heart)::int AS hearts_count,            
          COALESCE(
            jsonb_agg(
              DISTINCT JSONB_BUILD_OBJECT(
                'account', hu.account,
                'nickname', hu.nick_name,
                'avatar', hu.avatar
              )
            ) FILTER (WHERE hu.account IS NOT NULL),
            '[]'::jsonb
          ) AS liked_by  
        FROM articles a
        JOIN users u ON a.user_email = u.account
        LEFT JOIN hearts h ON a.slug = h.article_slug_heart
        LEFT JOIN users hu ON h.user_account_heart = hu.account 
        WHERE slug = 'kdyz-v-adru-prsi'
        GROUP BY 
          a.slug